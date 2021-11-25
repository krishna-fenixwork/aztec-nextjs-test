/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Slider } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import { Grid } from 'semantic-ui-react'
import Image from 'next/image'
import ic_doller from '../../aseets/ic_doller.svg';
import ic_calender from '../../aseets/ic_calender.svg';
import ic_location from '../../aseets/ic_location.svg';
import ic_people from '../../aseets/ic_people.svg';
import ic_flag from '../../aseets/ic_flag.svg';
import ic_search from '../../aseets/ic_search_admin.svg';
import ic_total_fund from '../../aseets/ic_total_fund.svg';

import ic_check_selected from '../../aseets/ic_checkbox_selected.svg';
import ic_check_unselected from '../../aseets/ic_checkbox_unselected.svg';

const loader:any = ({ src, width, quality }: { src:any, width:any, quality:any }) => {
    return `https://www.ag-grid.com/${src}?w=${width}&q=${quality || 75}`
}

const CompanyDetails = ({
    CompanyData,
    period,
    setPeriod,
    showSelection,
    startForcasting,
    macroTrend,
    entities,
    selectedMacroFactor,
    setSelectedMacroFactor,
    selectedTrendFactor,
    setSelectedTrendFactor,
}:{
    CompanyData:any,
    period:any,
    setPeriod:any,
    showSelection:any,
    startForcasting:any,
    macroTrend:any,
    entities:any,
    selectedMacroFactor:any,
    setSelectedMacroFactor:any,
    selectedTrendFactor:any,
    setSelectedTrendFactor:any,
}) => {

    const [macroTrends, setMacroTrend] = useState([])
    const [trends, setTrends] = useState([])

    // const [toggleMacroOptions, setToggleMacroOption] = useState(false);
    // const [toggleTrendOptions, setToggleTrendOption] = useState(false);

    const [isChange, setIsChange] = useState(false)

    const [inputValueMacro, setInputValueMacro] = React.useState('');
    const [inputValueTrend, setInputValueTrend] = React.useState('');

    const [macroFilterList, setMacroFilterList] = React.useState([])
    const [trendFilterList, setTrndFilterList] = React.useState([])

    const [openPopupMacro, setOpenPopupMacro] = useState(false);
    const [openPopupTrend, setOpenPopupTrend] = useState(false);

    const changePeriod = (event:any, value:any) => {
        setPeriod(value)
    }

    const marks = [
        {
            value: 1,
            label: '1 Year',
        },
        {
            value: 3,
            label: '3 Years',
        },
        {
            value: 5,
            label: '5 Years',
        },
    ];

    useEffect(() => {
        // var mac = CompanyData.macro_trends.map(a => {return {...a}});
        var mac = JSON.parse(JSON.stringify(CompanyData?.macro_trends))
        var macT = JSON.parse(JSON.stringify(CompanyData?.macro_trends))
        var macF = JSON.parse(JSON.stringify(macroTrend))

        setSelectedMacroFactor(mac)
        setMacroTrend(macT)
        setMacroFilterList(macF)

        var mac2 = JSON.parse(JSON.stringify(CompanyData?.entities))
        var macT2 = JSON.parse(JSON.stringify(CompanyData?.entities))
        var macFF = JSON.parse(JSON.stringify(entities))

        setSelectedTrendFactor(mac2)
        setTrends(macT2)
        setTrndFilterList(macFF)

        setIsChange(!isChange)
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CompanyData, macroTrend, entities])

    const selectMacro = (data:any) => {
        var dataTrend:any = macroTrends
        var dataTemp:any = macroTrends.find((o:{ macro_trend: string }) => o.macro_trend === data.macro_trend)

        if (!dataTrend.includes(dataTemp)) {
            dataTrend.push(data)

            setMacroTrend(dataTrend)
        }

        var list = selectedMacroFactor
        var dataT = selectedMacroFactor.find((o:{ macro_trend: string }) => o.macro_trend === data.macro_trend)

        if (list.includes(dataT)) {
            const index = list.indexOf(dataT);
            if (index > -1) {
                list.splice(index, 1);
            }

        } else
            list.push(data)

        setSelectedMacroFactor(list)
        setIsChange(!isChange)
    }

    const selectTrend = (data:any) => {
        var dataM:any = selectedTrendFactor
        var dataTrend:any = trends
        var dataT:any = selectedTrendFactor.find((o: any) => o === data)
        var dataTemp:any = trends.find(o => o === data)

        if (!dataTrend.includes(dataTemp)) {
            dataTrend.push(data)

            setTrends(dataTrend)
        }

        if (dataM.includes(dataT)) {
            const index = dataM.indexOf(dataT);
            if (index > -1) {
                dataM.splice(index, 1);
            }

        } else
            dataM.push(data)

        setSelectedTrendFactor(dataM)
        setIsChange(!isChange)
    }

    const onInputChangeMacro = (e:any) => {
        setInputValueMacro(e.target.value);

        // document.getElementById('autoCom_options').style.display = 'block';
        if (e.target.value.length > 0) {
            var data = macroTrend.filter((_data: { macro_trend: string }) => _data.macro_trend.toLowerCase().includes(e.target.value))
            setMacroFilterList(data)
            setOpenPopupMacro(true)
        } else if (e.target.value.length === 0) {
            // setMacroFilterList([]);
            setOpenPopupMacro(false)
        }
    }

    const onInputChangeTrend = (e:any) => {
        // console.log(e.target.value);
        setInputValueTrend(e.target.value);

        // document.getElementById('autoCom_options').style.display = 'block';
        if (e.target.value.length > 0) {
            var data = entities.filter((e_data: string) => e_data.toLowerCase().includes(e.target.value))
            // console.log(data);
            setTrndFilterList(data)
            setOpenPopupTrend(true)
        } else if (e.target.value.length === 0) {
            // setMacroFilterList([]);
            setOpenPopupTrend(false)
        }
    }

    return (
        <div>

            <div className="d-flex cac-center-verticle company_details" >

                <img alt="" src={CompanyData?.logo_url} style={{ width: 80, height: 80, borderRadius: "50px" }} />

                <div className="comp_desc">

                    <div className="poppins-normal font-white">{CompanyData?.short_description}</div>

                </div>

                <div className="d-flex div_overview">

                    <Grid container direction='row' spacing={4} alignItems="stretch">

                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>

                            <div className="justify-content-between" >

                                <div className="div_row_sm">
                                    <Image src={ic_calender} height={20} width={20} loader={loader} />

                                    <div style={{ marginLeft: "10px", marginTop: "0px" }}>

                                        <div className="poppins-normal font-white" style={{ fontSize: "9px" }}> Founding date</div>
                                        <div className="poppins-bold font-white" style={{ marginTop: "-3px" }}> {CompanyData?.founded_on}</div>

                                    </div>

                                </div>

                                <div className="div_row_sm " style={{ marginTop: "8px" }}>

                                    <Image src={ic_location} height={20} width={20} loader={loader} />
                                    <div style={{ marginLeft: "10px" }}>

                                        <div className="poppins-normal font-white" style={{ fontSize: "9px" }}> Location</div>
                                        <div className="poppins-bold font-white eclipse_loc_short" style={{ marginTop: "-3px" }}>{CompanyData?.city}, {CompanyData?.region}</div>

                                    </div>

                                </div>

                            </div>

                        </Grid>

                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} style={{ marginTop: 0 }}>

                            <div className="justify-content-between">

                                <div className="div_row_sm " style={{ marginTop: "0px" }}>
                                    <Image src={ic_people} height={20} width={20} loader={loader} />

                                    <div style={{ marginLeft: "10px" }}>

                                        <div className="poppins-normal font-white" style={{ fontSize: "9px" }}> Employees</div>
                                        <div className="poppins-bold font-white" style={{ marginTop: "-3px" }}> {CompanyData?.employee_count}</div>

                                    </div>

                                </div>

                                <div className="div_row_sm " style={{ marginTop: "8px" }}>
                                    <Image src={ic_doller} height={20} width={20} loader={loader} />

                                    <div style={{ marginLeft: "10px" }}>

                                        <div className="poppins-normal font-white" style={{ fontSize: "9px" }}> Last funding date</div>
                                        <div className="poppins-bold font-white eclipse_loc_short" style={{ marginTop: "-3px" }}>{CompanyData?.last_funding_date}</div>

                                    </div>

                                </div>

                            </div>

                        </Grid>

                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} style={{ marginTop: 0 }}>

                            <div className="justify-content-between">

                                <div className="div_row_sm" style={{ marginTop: "0px" }}>
                                    <Image src={ic_flag} height={20} width={20} loader={loader} />

                                    <div style={{ marginLeft: "10px" }}>

                                        <div className="poppins-normal font-white" style={{ fontSize: "9px" }}> Status</div>
                                        <div className="poppins-bold font-white" style={{ marginTop: "-3px" }}> {typeof CompanyData?.status === 'undefined' ? "---" : CompanyData?.status}</div>

                                    </div>

                                </div>

                                <div className="div_row_sm " style={{ marginTop: "8px" }}>
                                    <Image src={ic_total_fund} height={20} width={20} loader={loader} />

                                    <div style={{ marginLeft: "10px" }}>

                                        <div className="poppins-normal font-white" style={{ fontSize: "9px" }}> Total Funding</div>
                                        <div className="poppins-bold font-white" style={{ marginTop: "-3px" }}> {CompanyData?.total_funding}</div>

                                    </div>

                                </div>

                            </div>

                        </Grid>

                    </Grid>

                </div>

            </div>

            {
                showSelection &&

                <div className="d-flex" style={{ width: "100%" }}>
                    <div className="removed_border input_box_container checklist-container" >

                        <div className="poppins-bold font-white" style={{ fontSize: "15px" }}> Recommended macro economic data</div>

                        <Grid container style={{ marginTop: "20px", marginBottom: "10px" }}>

                            {macroTrends && macroTrends.map((data:any,index:any) => (
                                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} style={{ marginTop: 0, padding: "10px" }} key={index}>

                                    <div>

                                        <div className="d-flex">
                                            {
                                                selectedMacroFactor.find((o: { macro_trend: any }) => o.macro_trend === data.macro_trend) ?
                                                    <Image src={ic_check_selected} height={20} width={20}
                                                        onClick={() =>
                                                            selectMacro(data)
                                                        } loader={loader} />
                                                    :
                                                    <Image src={ic_check_unselected} height={20} width={20}
                                                        onClick={() =>
                                                            selectMacro(data)
                                                        } loader={loader} />
                                            }

                                            <div className="poppins-bold font-white" style={{ marginLeft: "10px" }}>{data.macro_trend}</div>

                                        </div>

                                    </div>

                                </Grid>
                            ))
                            }

                        </Grid>

                        <Popup
                            trigger={
                                <div >
                                    <div className="removed_border_btn input_box_container_btn" style={{ marginTop: "10px" }}
                                        onClick={() => setOpenPopupMacro(!openPopupMacro)}>

                                        <Image src={ic_search} height={20} width={20} loader={loader} />

                                        <input type="text" value={inputValueMacro} className="cac_automcomplete_input_trend" placeholder="Add new factor"
                                            onChange={onInputChangeMacro}
                                            onClick={() => setOpenPopupMacro(!openPopupMacro)} />

                                        <div style={{ marginLeft: "10px", marginTop: "-5px" }}>

                                            {
                                                openPopupMacro ?
                                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.99508 10L3.9074 10C1.31929 10 0.255901 8.2364 1.55386 6.08255L2.60162 4.34897L3.64937 2.61538C4.94733 0.461538 7.06629 0.461538 8.36425 2.61538L9.41201 4.34897L10.4598 6.08255C11.7343 8.2364 10.6787 10 8.08277 10L5.99508 10Z" fill="#1EE8B7" stroke="#1EE8B7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.00492 1L8.0926 1C10.6807 1 11.7441 2.7636 10.4461 4.91745L9.39838 6.65103L8.35063 8.38462C7.05267 10.5385 4.93371 10.5385 3.63575 8.38462L2.58799 6.65103L1.54024 4.91745C0.265736 2.7636 1.32131 1 3.91723 1L6.00492 1Z" stroke="#1EE8B7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                            }

                                        </div>

                                    </div>

                                </div>
                            }
                            position='bottom center'
                            // on='click'
                            open={openPopupMacro}
                            closeOnDocumentClick
                            arrow={false}
                            contentStyle={{ padding: '0px', border: 'none', background: "transparent" }}
                            arrowStyle={{ color: "#28664fb3" }}
                        >

                            <div className="removed_border_popup input_box_container_popup" >
                                <div style={{ marginTop: "10px" }}>
                                    {
                                        macroFilterList.length > 0 ?

                                            macroFilterList && macroFilterList.map((data:any, index:any) => (
                                                <div className="border_bottom" onClick={() =>
                                                    selectMacro(data)} key={index}>

                                                    <div className="poppins-normal font-white">{data.macro_trend}</div>
                                                </div>
                                            ))
                                            :
                                            <div>No options</div>
                                    }

                                </div>


                            </div>

                        </Popup>


                    </div>

                    <div className="removed_border input_box_container checklist-container" >

                        <div className="poppins-bold font-white" style={{ fontSize: "15px" }}> Recommended trend data</div>

                        <Grid container style={{ marginTop: "20px", marginBottom: "10px" }}>

                            {trends.map((data:any, index:any) => (
                                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} style={{ marginTop: 0, padding: "10px" }} key={index}>

                                    <div>

                                        <div className="d-flex">

                                            {
                                                selectedTrendFactor.find((o: any) => o === data) ?
                                                    <Image src={ic_check_selected} height={20} width={20}
                                                        onClick={() =>
                                                            selectTrend(data)
                                                        } loader={loader} />
                                                    :
                                                    <Image src={ic_check_unselected} height={20} width={20}
                                                        onClick={() =>
                                                            selectTrend(data)
                                                        } loader={loader} />

                                            }

                                            <div className="poppins-bold font-white" style={{ marginLeft: "10px" }}>{data}</div>

                                        </div>

                                    </div>

                                </Grid>
                            ))
                            }

                        </Grid>

                        <Popup
                            trigger={
                                <div >
                                    <div className="removed_border_btn input_box_container_btn" style={{ marginTop: "10px" }}
                                        onClick={() => setOpenPopupTrend(!openPopupTrend)}>

                                        <Image src={ic_search} height={20} width={20} loader={loader} />

                                        <input type="text" value={inputValueTrend} className="cac_automcomplete_input_trend" placeholder="Add new factor"
                                            onChange={onInputChangeTrend}
                                            onClick={() => setOpenPopupTrend(!openPopupTrend)} />

                                        <div style={{ marginLeft: "10px", marginTop: "-5px" }}>

                                            {
                                                openPopupTrend ?
                                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.99508 10L3.9074 10C1.31929 10 0.255901 8.2364 1.55386 6.08255L2.60162 4.34897L3.64937 2.61538C4.94733 0.461538 7.06629 0.461538 8.36425 2.61538L9.41201 4.34897L10.4598 6.08255C11.7343 8.2364 10.6787 10 8.08277 10L5.99508 10Z" fill="#1EE8B7" stroke="#1EE8B7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.00492 1L8.0926 1C10.6807 1 11.7441 2.7636 10.4461 4.91745L9.39838 6.65103L8.35063 8.38462C7.05267 10.5385 4.93371 10.5385 3.63575 8.38462L2.58799 6.65103L1.54024 4.91745C0.265736 2.7636 1.32131 1 3.91723 1L6.00492 1Z" stroke="#1EE8B7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                            }

                                        </div>

                                    </div>

                                </div>
                            }
                            position='bottom center'
                            open={openPopupTrend}
                            closeOnDocumentClick
                            arrow={false}
                            contentStyle={{ padding: '0px', border: 'none', background: "transparent" }}
                        // arrowStyle={{ color: "#00000000" }}
                        >

                            <div className="removed_border_popup input_box_container_popup" >
                                <div style={{ marginTop: "14px" }}>
                                    {

                                        trendFilterList.length > 0 ?

                                            trendFilterList && trendFilterList.map((data:any, index:any) => (
                                                <div className="border_bottom" onClick={() =>
                                                    selectTrend(data)} key={index}>

                                                    <div className="poppins-normal font-white">{data}</div>
                                                </div>
                                            ))
                                            :
                                            <div>No options</div>
                                    }

                                </div>


                            </div>

                        </Popup>

                    </div>

                </div >

            }

            {
                showSelection &&
                <div className="div-center">

                    <div className="sme_ac_slider mb-4">
                        <Slider
                            aria-label="Custom marks"
                            value={period}
                            step={1}
                            valueLabelDisplay="off"
                            marks={marks}
                            min={1}
                            max={5}
                            onChange={changePeriod}
                        />
                    </div>

                </div>
            }

            {
                showSelection && <div className="div-center">

                    <button className="removed_border_btn input_box_container_btn" style={{ marginTop: "40px", padding: "15px 30px" }} onClick={() => startForcasting()}>
                        Start forcasting
                    </button>

                </div>
            }

        </div >
    )
}

export default CompanyDetails;