import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import LottieAnimation from '../../../services/lottie_animation';
import AnimationLoader from '../../../components/animation_loader';
import simulation_animation from '../../aseets/animation/simulation_animation.json';
import SideMenu from '../../../components/sidemenu';
import SimulationAutocomplete from './simulation_autocomplete';
import { getCompanyPerformance, getEntities, getMacroTrends, getMarketFactor, getPredictEntity } from '../../../api/api';
import { notifyError, notifyInfo } from '../../../services/toaster_services';
import CompanyDetails from './company_details';
import ForcastingGraph from './forcasting_graph';
import { auth } from '../../../firebase/config_s';
import { useRouter } from 'next/router'

const SimulationBarChart = dynamic(() => import("./simulation_bar_chart"), { ssr: false });
const SimulationFundGraph = dynamic(() => import("./simulation-fund-graph"), { ssr: false });
const SimulationScenarios = dynamic(() => import("./simulation-scenarios"), { ssr: false });
const SimulationTable = dynamic(() => import("./simulation-table"), { ssr: false });

const Simulation = ({ }) => {
    const router = useRouter();
    const [loadingDataGraph, setLoadingDataGraph] = useState(false);
    const [loadingDataCompany, setLoadingDataCompany] = useState(false);
    const [loadingDataMarket, setLoadingDataMarket] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false)

    const [selectedFund, setSelectedFund] = useState(null);
    const [timePeriod, setTimePeriod] = useState(1);
    const [showSelection, setShowSelection] = useState(true)

    const [macroTrends, setMacroTrends] = useState([])
    const [entities, setEntities] = useState([])

    const [predictModelData, setPredictModelData] = useState(null)

    const [barChartData1, setBarChartData1] = useState([]);
    const [barChartData2, setBarChartData2] = useState([]);
    const [barChartData3, setBarChartData3] = useState([]);
    const [barChartData4, setBarChartData4] = useState([]);

    //
    const [selectedMacroFactor, setSelectedMacroFactor] = useState([])
    const [selectedTrendFactor, setSelectedTrendFactor] = useState([])

    // forecasting graph
    const [chart_data_market, setChartDataMarket] = useState()
    const [chart_data_company, setChartDataCompany] = useState()

    const [selectedMarketFactor, setSelectedMarketFactor] = useState("");
    const [selectedCompFactor, setSelectedCompFactor] = useState("");

    const [forcatstCompStartDate, setForcastCompStartDate] = useState("2021-09-15")
    const [forcatstCompEndDate, setForcastCompEndDate] = useState("2022-03-15")
    const [forcatstCompNextDate, setForcastCompNextDate] = useState("2021-09-16")

    const [forcatsMarketStartDate, setForcastMarketStartDate] = useState("2021-09-15")
    const [forcatstMarketEndDate, setForcastMarketEndDate] = useState("2022-03-15")
    const [forcatstMarketNextDate, setForcastMarketNextDate] = useState("2021-09-16")

    const [error, setError] = useState(false)

    const [tableData, setTableData] = useState(null)

    const [barChart1, setFundBarChart1] = useState(null);
    const [barChart3, setFundBarChart3] = useState(null);
    const [barChart4, setFundBarChart4] = useState(null);

    const onlogout = () => {
        auth.signOut();
        localStorage.clear();
        router.push('/onboarding/login')
    }

    const onAutocompleteSelect = (option) => {
        setSelectedFund(option);

        getMacroTrends(option.uuid).then(response => {
            setMacroTrends(response)
        })

        getEntities(option.uuid).then(response => {
            setEntities(response.entities)
        })
    }

    const onTimePeriodChange = (event, value) => {
        setLoadingDataGraph(true);
        setLoadingDataMarket(true);
        setLoadingDataCompany(true);
        setShowAnimation(true)
        setPredictModelData(null);
        if (selectedFund) {
            setTimePeriod(value);
            setBarChartData1([]);
            setBarChartData2([]);
            setBarChartData3([]);
            setBarChartData4([]);
            findEntities(selectedFund, value);
            getGraphs(selectedFund, value);
        } else notifyInfo('Select fund first!');
    }

    const findEntities = (fund, period) => {
        const macroTrend_data = selectedMacroFactor.map((item) => item.macro_uuid)
        getPredictEntity({
            "macro_trends": macroTrend_data,
            "entities": selectedTrendFactor,
            "period": period
        }).then(response => {
            setLoadingDataGraph(false)
            setPredictModelData(response);
            setShowSelection(false)
        }).catch(predict_error => {
            setLoadingDataGraph(false)
            notifyError('Could not find entities!');
            // history.push('/')
            setError(true)
        })
    }

    const getGraphs = (option, period) => {

        const macroTrend = selectedMacroFactor.map((item) => item.macro_uuid)

        getMarketFactor(macroTrend, selectedTrendFactor, period).then(response => {
            var dataArr = []
            var innData = []

            for (var i = 0; i < response.market_factor.length; i++) {
                innData = []
                var historical_data = JSON.parse(response.market_factor[i].historical_data)
                for (var j = 0; j < historical_data.length; j++) {
                    innData.push(historical_data[j])
                }

                var forecast_data = JSON.parse(response.market_factor[i].forecast_data)
                for (var k = 0; k < forecast_data.length; k++) {
                    if (k === 0) {
                        setForcastMarketStartDate(forecast_data[k].date)
                    }
                    if (k === 1) {
                        setForcastMarketNextDate(forecast_data[k].date)
                    }
                    if (k === forecast_data.length - 1) {
                        setForcastMarketEndDate(forecast_data[k].date)
                    }
                    innData.push(forecast_data[k])
                }

                var data = {
                    data: innData,
                    name: response.market_factor[i].name
                }

                if (i === 0) {
                    setSelectedMarketFactor(response.market_factor[i].name)
                }

                dataArr.push(data)
            }

            setLoadingDataMarket(false);
            setChartDataMarket(dataArr)
            setShowSelection(false)

        }).catch(marketf_error => {
            setLoadingDataMarket(false);
            notifyError('Could not find market factor!');
            setError(true)
            // history.push('/')
        });

        getCompanyPerformance(macroTrend, selectedTrendFactor, period).then(response => {
            var dataArrComp = []
            var innData = []

            for (var i = 0; i < response.company_performance.length; i++) {
                innData = []
                var historical_data = JSON.parse(response.company_performance[i].historical_data)
                for (var j = 0; j < historical_data.length; j++) {
                    innData.push(historical_data[j])
                }

                var forecast_data = JSON.parse(response.company_performance[i].forecast_data)
                for (var k = 0; k < forecast_data.length; k++) {
                    if (k === 0) {
                        setForcastCompStartDate(forecast_data[k].date)
                    }
                    if (k === 1) {
                        setForcastCompNextDate(forecast_data[k].date)
                    }
                    if (k === forecast_data.length - 1) {
                        setForcastCompEndDate(forecast_data[k].date)
                    }
                    innData.push(forecast_data[k])
                }

                var data = {
                    data: innData,
                    name: response.company_performance[i].name
                }

                if (i === 0) {
                    setSelectedCompFactor(response.company_performance[i].name)
                }

                dataArrComp.push(data)
            }

            setChartDataCompany(dataArrComp)
            setShowSelection(false)
            setLoadingDataCompany(false);

        }).catch(comp_error => {
            setLoadingDataCompany(false);
            notifyError('Could not find company performance!');
            setError(true)
            // history.push('/')
        });
    }

    const startForcasting = () => {
        // console.log(timePeriod);
        setLoadingDataGraph(true);
        setLoadingDataMarket(true);
        setLoadingDataCompany(true);
        setShowAnimation(true)
        setTimeout(() => {
            findEntities(selectedFund, timePeriod);
            getGraphs(selectedFund, timePeriod);
        }, 1000);
    }

    const resetData = () => {
        setPredictModelData(null);
        setSelectedFund(null);
        setBarChartData1([]);
        setBarChartData2([]);
        setBarChartData3([]);
        setBarChartData4([]);
        setTableData(null);
        setTimePeriod(1);
        setShowSelection(true)
        setChartDataMarket(null);
        setChartDataCompany(null);
        setSelectedMarketFactor("");
        setSelectedCompFactor("");
    }

    const onScenarioChange = (data, scenorioType, _tableData) => {
        if (_tableData) {
            // console.log("table data", _tableData);
            var tableDataT = []

            for (var i = 0; i < _tableData.digital_footprint.length; i++) {
                var dataDigital = _tableData.digital_footprint[i]
                var dataRevenue = _tableData.revenue[i]
                var dataEmployees = _tableData.employees[i]
                var dataSocialScore = _tableData.social_score[i]

                var dataT = {
                    revenue_optimist: dataRevenue.positive,
                    revenue_positive: dataRevenue.positive,
                    revenue_negetive: dataRevenue.negetive,

                    employees_optimist: dataEmployees.optimist,
                    employees_positive: dataEmployees.positive,
                    employees_negetive: dataEmployees.negetive,

                    digital_optimist: dataDigital.optimist,
                    digital_positive: dataDigital.positive,
                    digital_negetive: dataDigital.negetive,

                    social_optimist: dataSocialScore.optimist,
                    social_positive: dataSocialScore.positive,
                    social_negetive: dataSocialScore.negetive
                }

                tableDataT.push(dataT)
            }

            // console.log(tableDataT);
            setTableData(tableDataT)
        }
        setChartData(data, scenorioType);
    }

    const setChartData = (initial_data, scenorioType) => {
        if (scenorioType === 'all') {
            let data = [
                {
                    category: 'Revenue',
                    optimist: initial_data[0]?.revenue,
                    middle: initial_data[2]?.revenue,
                    negetive: initial_data[1]?.revenue
                },
                {
                    category: 'Employees',
                    optimist: initial_data[0]?.employees,
                    middle: initial_data[2]?.employees,
                    negetive: initial_data[1]?.employees
                },
                {
                    category: 'Digital footprint',
                    optimist: initial_data[0]?.digital_footprint,
                    middle: initial_data[2]?.digital_footprint,
                    negetive: initial_data[1]?.digital_footprint
                },
                {
                    category: 'Social Score',
                    optimist: initial_data[0]?.social_score,
                    middle: initial_data[2]?.social_score,
                    negetive: initial_data[1]?.social_score
                }
            ];
            if (barChart1) barChart1.data = data[0];
            // if (barChart2) barChart2.data = data[1];
            if (barChart3) barChart3.data = data[2];
            if (barChart4) barChart4.data = data[3];
            setBarChartData1([data[0]]);
            setBarChartData2([data[1]]);
            setBarChartData3([data[2]]);
            setBarChartData4([data[3]]);
        } else {
            let barData1 = barChartData1;
            let barData2 = barChartData2;
            let barData3 = barChartData3;
            let barData4 = barChartData4;

            switch (scenorioType) {
                case 0:
                    barData1[0].optimist = initial_data[0]?.revenue;
                    barData2[0].optimist = initial_data[0]?.employees;
                    barData3[0].optimist = initial_data[0]?.digital_footprint;
                    barData4[0].optimist = initial_data[0]?.social_score;
                    break;
                case 2:
                    barData1[0].negetive = initial_data[0]?.revenue;
                    barData2[0].negetive = initial_data[0]?.employees;
                    barData3[0].negetive = initial_data[0]?.digital_footprint;
                    barData4[0].negetive = initial_data[0]?.social_score;
                    break;
                case 1:
                    barData1[0].middle = initial_data[0]?.revenue;
                    barData2[0].middle = initial_data[0]?.employees;
                    barData3[0].middle = initial_data[0]?.digital_footprint;
                    barData4[0].middle = initial_data[0]?.social_score;
                    break;
                default:
                    break;
            }
            if (barChart1) barChart1.data = barData1;
            // if (barChart2) barChart2.data = barData2;
            if (barChart3) barChart3.data = barData3;
            if (barChart4) barChart4.data = barData4;
            setBarChartData1(barData1);
            setBarChartData2(barData2);
            setBarChartData3(barData3);
            setBarChartData4(barData4);
        }
        // barChart.data = data; 
    }

    useEffect(() => {
        if (chart_data_market && chart_data_company && predictModelData) {

            setTimeout(() => {
                setShowAnimation(false)
            }, 10000)
        }

        return () => {
        }
    }, [chart_data_market, chart_data_company, predictModelData])

    return (
        <div className="" style={{ position: 'relative' }}>
            <button className="btn btn-primary" onClick={onlogout}>Logout</button>
            {
                (loadingDataCompany || loadingDataGraph || loadingDataMarket || showAnimation) && <div className="loader_center">

                    <LottieAnimation lotti={simulation_animation} />

                </div>
            }

            <div className="container-center-horizontal monitoring-design-new-design screen">

                {/* <SideMenu activePathName="FINDING" /> */}

                <div id="main_section" className="w-100 ps-5" style={{ width: "100%" }}>
                    <div className="drop-col-sm w-100" id="droppableBox" style={{ paddingTop: 25 }}>

                        <SimulationAutocomplete selectedFundOption={selectedFund} setSelectedOption={onAutocompleteSelect}
                            period={timePeriod} setPeriod={onTimePeriodChange} reset={resetData} showSelection={showSelection} />

                        {
                            selectedFund &&
                            <CompanyDetails
                                CompanyData={selectedFund}
                                showSelection={showSelection}
                                period={timePeriod}
                                setPeriod={setTimePeriod}
                                startForcasting={startForcasting}
                                macroTrend={macroTrends}
                                entities={entities}
                                selectedMacroFactor={selectedMacroFactor}
                                setSelectedMacroFactor={setSelectedMacroFactor}
                                selectedTrendFactor={selectedTrendFactor}
                                setSelectedTrendFactor={setSelectedTrendFactor}
                            />
                        }

                        <div>
                            {
                                chart_data_market && chart_data_company && (
                                    <ForcastingGraph
                                        chart_data_market={chart_data_market}
                                        chart_data_company={chart_data_company}
                                        selectedMarketFactor={selectedMarketFactor}
                                        setSelectedMarketFactor={setSelectedMarketFactor}
                                        selectedCompFactor={selectedCompFactor}
                                        setSelectedCompFactor={setSelectedCompFactor}
                                        forcatstCompStartDate={forcatstCompStartDate}
                                        forcatstCompEndDate={forcatstCompEndDate}
                                        forcatstCompNextDate={forcatstCompNextDate}
                                        forcatsMarketStartDate={forcatsMarketStartDate}
                                        forcatstMarketEndDate={forcatstMarketEndDate}
                                        forcatstMarketNextDate={forcatstMarketNextDate}
                                    />
                                )
                            }
                        </div>

                        {
                            (!loadingDataGraph) &&
                            <div id="sme_fund_graph">
                                <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>

                                    <div className="sme_sce_cases d-flex justify-content-between" style={{ width: '100%' }}>
                                        {
                                            !loadingDataGraph && barChartData1 && barChartData1.length > 0 && (
                                                <div className="sme_fg_bchart_1">
                                                    <div className="sme_bar_chart d-flex flex-wrap" style={{ width: '100%' }}>
                                                        <div className="bc_chart_container">
                                                            <SimulationBarChart id="sme_revenue_chart" barData={barChartData1} setChart={setFundBarChart1} />
                                                        </div>
                                                        <div className="bc_chart_container p-0">
                                                            {
                                                                (!loadingDataCompany && !loadingDataGraph && !loadingDataMarket) && barChartData1 && barChartData1.length > 0 && (
                                                                    <div>
                                                                        <SimulationFundGraph entities={selectedFund?.entities} trends={selectedFund?.macro_trends}
                                                                            selectedMacroFactor={selectedMacroFactor} selectedTrendFactor={selectedTrendFactor} />
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="sme_bar_chart d-flex flex-wrap" style={{ width: '100%' }}>

                                                        <div className="bc_chart_container">
                                                            <SimulationBarChart id="sme_footprint_chart" barData={barChartData3} setChart={setFundBarChart3} />
                                                        </div>
                                                        <div className="bc_chart_container">
                                                            <SimulationBarChart id="sme_social_chart" barData={barChartData4} setChart={setFundBarChart4} />
                                                        </div>
                                                    </div>

                                                    <div className="legend">
                                                        <div style={{ height: "28px", width: "28px", borderRadius: "2px", background: "#64e9b7" }}></div>
                                                        <div className="poppins-medium font-white" style={{ fontSize: "12px", paddingLeft: "4px", paddingRight: "12px" }}>Scenario Optimist</div>

                                                        <div style={{ height: "28px", width: "28px", borderRadius: "2px", background: "#986efa" }}></div>
                                                        <div className="poppins-medium font-white" style={{ fontSize: "12px", paddingLeft: "4px" }}>Scenario Median</div>

                                                        <div className="ms-2" style={{ height: "28px", width: "28px", borderRadius: "2px", background: "#e778fb" }}></div>
                                                        <div className="poppins-medium font-white" style={{ fontSize: "12px", paddingLeft: "4px", paddingRight: "12px" }}>Scenario Pessimistic</div>


                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            !loadingDataGraph && predictModelData && (
                                                <SimulationScenarios
                                                    predictedData={predictModelData}
                                                    onSliderChange={onScenarioChange}
                                                    entities={selectedFund?.entities}
                                                    trends={selectedFund?.macro_trends}
                                                    selectedMacroFactor={selectedMacroFactor}
                                                    selectedTrendFactor={selectedTrendFactor} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="graph_bg" style={{ marginTop: "20px" }}>
                            {
                                !loadingDataGraph && tableData && <SimulationTable
                                    data={tableData} />
                            }
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Simulation;

