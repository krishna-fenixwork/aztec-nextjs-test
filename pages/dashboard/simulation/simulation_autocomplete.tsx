import React from "react";
import { getAutoCompleteForecasting, getFundGraph } from "../../../api/api";
// import { ReactComponent as SearchAdmin } from '../../aseets/ic_search_simulation.svg';

const SimulationAutocomplete = ({ selectedFundOption, setSelectedOption, period, setPeriod, reset, showSelection }) => {

    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isSelectionGoing, setIsSelectionGoing] = React.useState(false);

    const onInputChange = (e) => {
        // console.log(e);
        setInputValue(e.target.value);
        setIsSelectionGoing(true);
        document?.getElementById('autoCom_options').style.display = 'block';
        if (e.target.value.length > 0) {
            setLoading(true);
            getAutoCompleteForecasting(e.target.value).then(response => {
                setLoading(false)
                setOptions(response)
            }).catch(error => {
                setOptions([])
                document?.getElementById('autoCom_options').style.display = 'none';
            });
        } else if (e.target.value.length === 0) {
            setOptions([]);
            setIsSelectionGoing(false);
            document?.getElementById('autoCom_options').style.display = 'none';
        }
    }

    const onOptionSelect = (option) => {
        getFundGraph(option.uuid).then(response => {
            setIsSelectionGoing(false);
            setInputValue(option?.name);
            document?.getElementById('autoCom_options').style.display = 'none';
            option.entities = []
            option.macro_trends = []
            if (response && response !== {} && typeof response.entities != 'undefined' && response.entities)
                option.entities = response.entities
            if (response && response !== {} && typeof response.macro_trends != 'undefined' && response.macro_trends)
                option.macro_trends = response.macro_trends
            // console.log(option);

            setSelectedOption(option);
        }).catch(error => {
            document?.getElementById('autoCom_options').style.display = 'none';
        });
    }

    return (

        <div>

            <div className="d-flex cac-center-verticle" >
                <div className="text-left">
                    <div className="poppins-medium font-white" style={{ fontSize: "24px" }}>Simulations</div>
                </div>
                {/* <SearchAdmin alt="" fill="#ffffff" style={{ marginLeft: "52px" }} /> */}

                <input type="text" value={inputValue} className="cac_automcomplete_input" placeholder="Type Here"
                    onChange={onInputChange}
                    onKeyDown={(e) => {
                        if (e.keyCode === 8) {
                            reset();
                        }
                    }} />
            </div>

            <div className="autoComplete-Box flex-column" >
                <div className={`cac_bg ${isSelectionGoing ? 'removed_border' : ''}`}>
                    <div className="input_box_container position-relative" >

                        {
                            inputValue && (
                                <div className="cross_empty" onClick={() => {
                                    setInputValue('');
                                    reset();
                                }}><i style={{ color: 'white' }} className="fa fa-times"></i></div>
                            )
                        }
                        <div id="autoCom_options" className="cac_autocomplete_dropdown" >
                            {
                                !loading && options.length === 0 && (
                                    <div className="cac_automcomplete_option_odd">No Options</div>
                                )
                            }
                            {
                                loading && (
                                    <div className="m-5" style={{ textAlign: "center" }}>
                                        <i className="fa fa-spinner fa-spin" style={{ fontSize: 30, color: '#1ee8b7' }}></i>
                                    </div>
                                )
                            }
                            {
                                !loading && options && options.length > 0 && options.map((item, key) => (
                                    <div>
                                        {

                                            <div key={key} onClick={() => onOptionSelect(item)} className={key % 2 === 0 ? "cac_automcomplete_option_even d-flex" : "cac_automcomplete_option_odd d-flex"}>
                                                <img alt="" src={item.logo_url} style={{ width: 30, height: 30, borderRadius: "50px" }} />
                                                <div className="poppins-normal font-green" style={{ marginLeft: "10px", fontSize: "12px" }}>
                                                    {item?.name}{" - "}
                                                </div>
                                                <div className="poppins-normal font-white" style={{ marginLeft: "10px", fontSize: "10px" }}>

                                                    {item?.category_groups_list}{" - "}
                                                    {item?.city} ,
                                                    {item?.region}{" - "}
                                                    {item?.short_description}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimulationAutocomplete