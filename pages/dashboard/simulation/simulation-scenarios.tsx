import React from 'react';
import { Slider } from '@material-ui/core';
import jsbayes from 'jsbayes';

// import { predictedData } from './jbyes-test/test-json-data';

const SimulationScenarios = ({ predictedData, onSliderChange, entities, trends,
    selectedMacroFactor,
    selectedTrendFactor }) => {

    const SCENARIOS = ['Optimistic scenario', 'Median scenario', 'Pessimistic scenario']
    // const SCENARIO_SLIDERS = ['Economic growth rates', 'Consumer index', 'Country stock index',
    //     'Population income', 'Macro economy', 'Inflation'];
    // const [sliders, setSliders] = React.useState(SCENARIO_SLIDERS);
    const [isOnLoad, setIsOnLoad] = React.useState(true);

    const [listScenario, setScenario] = React.useState(null);

    const [selectedScenario, setSelectedScenario] = React.useState(0)

    let pridictionData = [];
    let tableData = {
        revenue: [],
        employees: [],
        digital_footprint: [],
        social_score: []
    };

    React.useEffect(() => {
        let data = [];
        for (var j = 0; j < SCENARIOS.length; j++) {
            var dataS = {
                name: SCENARIOS[j]
            }
            console.log(selectedMacroFactor);
            var listSlider = []
            for (var i = 0; i < selectedMacroFactor.length; i++) {
                var dataM = {
                    name: selectedMacroFactor[i].macro_trend,
                    value: 0.5
                }
                listSlider.push(dataM)
            }
            for (var k = 0; k < selectedTrendFactor.length; k++) {
                var dataMM = {
                    name: selectedTrendFactor[k],
                    value: 0.5
                }
                listSlider.push(dataMM)
            }
            dataS.slider = listSlider
            data.push(dataS)
        }
        setScenario(data)
        // if (selectedMacroFactor && selectedTrendFactor) {
        //     const mapedTrends = selectedMacroFactor.map((item) => item?.macro_trend)
        //     dataT = [...selectedTrendFactor, ...mapedTrends];
        //     setSliders(dataT);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMacroFactor, selectedTrendFactor])

    React.useEffect(() => {

        if (isOnLoad &&
            predictedData &&
            listScenario &&
            listScenario[selectedScenario] &&
            listScenario[selectedScenario].slider) {
            onScenarioChange(null, 0.5, 'all', listScenario[selectedScenario].slider.length);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [predictedData, listScenario])

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const onScenarioChange = (event, value, scenario_index, slider_length) => {

        pridictionData = [];
        setIsOnLoad(false);
        console.log(value, scenario_index);
        var g = jsbayes.newGraph();

        var model_obj = predictedData["model"];

        var structure = model_obj['structure'];
        var nodes = [];
        const maxs = predictedData["maxs"];
        const mins = predictedData["mins"];

        model_obj['states'].forEach((element, j) => {
            var n1 = g.addNode(element['name'], ['0', '1', '2', '3', '4']);
            nodes.push(n1);
            if (element['distribution']) {
                if (element['distribution']['parents']) {
                    //n1.addParent(structure[j])
                    //console.log(structure[j][0]);
                    if (element['distribution']['table']) {
                        var tmp_cpt = element['distribution']['table'];
                        var final_cpt = [];
                        let tmp_arr = [];
                        for (let index = 0; index < tmp_cpt.length; index++) {
                            const _element = tmp_cpt[index];
                            tmp_arr.push(parseFloat(_element[2]));
                            if (tmp_arr.length === 5) {
                                final_cpt.push(tmp_arr);
                                tmp_arr = [];
                            }
                        }
                    }
                    n1.cpt = final_cpt;
                } else {
                    if (element['distribution']['parameters']) {
                        n1.cpt = element['distribution']['parameters'][0];
                    }

                }
            }
        });

        for (var i = 0; i < structure.length; i++) {
            if (structure[i].length > 0) {
                nodes[i].addParent(nodes[structure[i][0]]);
            }
        }
        // console.log(g.nodes[1].n);
        // console.log(g.nodes[2]);
        // Take value between 0 and 1, and round it to 1 digit, 0.1/0,2/0.3
        //  Default slider value - 0.5

        var slider_val = value;
        const discretes = ["0", "1", "2", "3", "4"];

        for (let index = 0; index < slider_length; index++) {
            g.observe(String(index), discretes[parseInt(slider_val * 5)]);
        }
        g.saveSamples = true;

        if (scenario_index === 'all') {

            for (let index = 0; index < 100; index++) {
                pridictionData = [];
                ['positive', 'negetive', 'neutral'].forEach((item, item_index) => {
                    calculatePredictData(g, item_index, maxs, mins, slider_length);
                })
                // eslint-disable-next-line no-loop-func
                setTimeout(() => {
                    // console.log(pridictionData);   
                    tableData['revenue'].push({
                        positive: pridictionData[0]?.revenue,
                        negetive: pridictionData[1]?.revenue,
                        optimist: pridictionData[2]?.revenue,
                    })
                    tableData['employees'].push({
                        positive: pridictionData[0]?.employees,
                        negetive: pridictionData[1]?.employees,
                        optimist: pridictionData[2]?.employees,
                    })
                    tableData['digital_footprint'].push({
                        positive: pridictionData[0]?.digital_footprint,
                        negetive: pridictionData[1]?.digital_footprint,
                        optimist: pridictionData[2]?.digital_footprint,
                    })
                    tableData['social_score'].push({
                        positive: pridictionData[0]?.social_score,
                        negetive: pridictionData[1]?.social_score,
                        optimist: pridictionData[2]?.social_score,
                    })

                }, 1000)
            }

        } else {
            // console.log('single wala hua...');
            tableData = null;
            calculatePredictData(g, scenario_index, maxs, mins, slider_length);
        }

        setTimeout(() => {
            // console.log(pridictionData);
            // console.log(tableData);
            if (scenario_index === 'all') onSliderChange(pridictionData, 'all', tableData);
            else onSliderChange(pridictionData, scenario_index, null);
        }, 1000)
        // g.sample(10000);
        // console.log(JSON.parse(JSON.stringify(g)).samples);

    }

    const calculatePredictData = (g, scenario, maxs, mins, slideLength) => {

        g.sample(10000).then(function (r) {
            var samples = g.samples;
            var numSliders = slideLength;
            // console.log(numSliders)
            var predictions = {};
            predictions[`${numSliders}`] = [0, 0, 0, 0, 0];
            predictions[`${numSliders + 1}`] = [0, 0, 0, 0, 0];
            predictions[`${numSliders + 2}`] = [0, 0, 0, 0, 0];
            predictions[`${numSliders + 3}`] = [0, 0, 0, 0, 0];
            // console.log(predictions)

            var preds = {}
            // console.log(samples);
            for (var i = samples.length - 1; i >= 0; i--) {
                var sample = samples[i];
                predictions[`${numSliders}`][parseInt(sample[`${numSliders}`])] += 1
                predictions[`${numSliders + 1}`][parseInt(sample[`${numSliders + 1}`])] += 1
                predictions[`${numSliders + 2}`][parseInt(sample[`${numSliders + 2}`])] += 1
                predictions[`${numSliders + 3}`][parseInt(sample[`${numSliders + 3}`])] += 1
            }
            preds["digital_footprint"] = predictions[`${numSliders}`].reduce((iMax, x, j, arr) => x > arr[iMax] ? j : iMax, 0);
            preds["employees"] = predictions[`${numSliders + 1}`].reduce((iMax, x, k, arr) => x > arr[iMax] ? k : iMax, 0);
            preds["revenue"] = predictions[`${numSliders + 2}`].reduce((iMax, x, l, arr) => x > arr[iMax] ? l : iMax, 0);
            preds["social_score"] = predictions[`${numSliders + 3}`].reduce((iMax, x, m, arr) => x > arr[iMax] ? m : iMax, 0);
            // console.log(samples);
            // console.log(preds);

            console.log(scenario);

            Object.keys(preds).forEach(function (key) {
                // console.log(key, preds[key]);
                var single_range = (maxs[key] - mins[key]) / 5;
                var min_pos = mins[key] + single_range * preds[key];
                var max_pos = mins[key] + single_range * (preds[key] + 1);
                // slider scenarios

                // var scenario = "positive" //negetive, neutral
                if (scenario === 0) {
                    preds[key] = max_pos;
                }
                if (scenario === 1) {
                    if (key === "employees" || key === "social_score") {
                        preds[key] = getRandomInt(min_pos, max_pos);
                    }
                    else {
                        preds[key] = getRandomArbitrary(min_pos, max_pos);
                    }
                }
                if (scenario === 2) {
                    preds[key] = min_pos;
                }

                // console.log(min_pos, max_pos);

            });
            // console.log(preds);
            pridictionData.push(preds);
            //do something like      
        });

    }

    const changeScenario = (index) => {
        setSelectedScenario(index)
    }

    const setSliderValue = (value, index) => {
        var data = listScenario
        data[selectedScenario].slider[index].value = value
        setScenario(data)
    }

    return (
        <div id="simulation_dwnld_scenarios">
            <div className="mb-2 poppins-medium font-white align-text-center" style={{ fontSize: 11 }}>{SCENARIOS[selectedScenario]}</div>
            <div className="sm_scenarios">

                <div className={`scenario sm_sce1 ${selectedScenario !== 2 ? 'mb-4' : ''}`} key={selectedScenario}>

                    <div className="d-flex justify-content-between align-items-center">

                        <div className="sm_sce_text"></div>

                        {
                            selectedScenario === 0 ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.5" d="M9.33333 0H1.33333C0.593333 0 0 0.6 0 1.33333V10.6667C0 11.4 0.593333 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V2.66667L9.33333 0ZM10.6667 10.6667H1.33333V1.33333H8.78L10.6667 3.22V10.6667ZM6 6C4.89333 6 4 6.89333 4 8C4 9.10667 4.89333 10 6 10C7.10667 10 8 9.10667 8 8C8 6.89333 7.10667 6 6 6ZM2 2H8V4.66667H2V2Z" fill="white" />
                                </svg>
                            ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 7.5V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V7.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.5 5L6 7.5L8.5 5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 7.5V1.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            )
                        }
                    </div>

                    <div className="sm_scenario_sliders">
                        {
                            (
                                listScenario &&
                                listScenario[selectedScenario] &&
                                listScenario[selectedScenario].slider) &&
                            listScenario[selectedScenario].slider.map((sce_item, sce_index) => (
                                <div className="d-flex justify-content-around align-items-center" key={sce_index} style={{ marginBottom: "20px" }}>
                                    <div className="sce_slider">

                                        <div className="sm_sce_text" style={{ fontSize: 10 }}>{sce_item.name}</div>
                                        <Slider defaultValue={sce_item.value} aria-label="Default" valueLabelDisplay="off"
                                            onChange={(e, value) => {
                                                setSliderValue(value, sce_index)
                                                onScenarioChange(e, value, selectedScenario, listScenario[selectedScenario].slider.length)
                                            }} min={0} max={1} step={0.1} />
                                    </div>
                                    <div className="mt-2">
                                        <svg width="12" height="12" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.33333 4.00146H1.66667C1.29848 4.00146 1 4.30009 1 4.66846V7.00296C1 7.37134 1.29848 7.66997 1.66667 7.66997H6.33333C6.70152 7.66997 7 7.37134 7 7.00296V4.66846C7 4.30009 6.70152 4.00146 6.33333 4.00146Z" stroke={`${selectedScenario === 0 ? '#1EE8B7' : 'white'}`} stroke-opacity={`${selectedScenario === 0 ? 1 : 0.5}`} stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2.3335 4.0015V2.6675C2.3335 2.22525 2.50909 1.80112 2.82165 1.4884C3.13421 1.17568 3.55814 1 4.00016 1C4.44219 1 4.86611 1.17568 5.17867 1.4884C5.49123 1.80112 5.66683 2.22525 5.66683 2.6675V4.0015" stroke={`${selectedScenario === 0 ? '#1EE8B7' : 'white'}`} stroke-opacity={`${selectedScenario === 0 ? 1 : 0.5}`} stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "20px" }}>

                    {
                        listScenario && listScenario.map((item, index) => (

                            <div>
                                {
                                    <div className="div_hand" onClick={() =>
                                        changeScenario(index)
                                    }>
                                        {
                                            item.name === SCENARIOS[0] &&

                                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 17V7" stroke={item.name === listScenario[selectedScenario].name ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13 17V1" stroke={item.name === listScenario[selectedScenario].name ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M1 17V13" stroke={item.name === listScenario[selectedScenario].name ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        }
                                    </div>
                                }
                                {
                                    <div className="div_hand" onClick={() =>
                                        changeScenario(index)
                                    }>
                                        {
                                            item.name === SCENARIOS[1] &&
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 11V1" stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13 11V1" stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M1 11V1" stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            // <IcMiddle style={{ height: "20px", width: "20px" }} stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} />
                                        }
                                    </div>
                                }
                                {
                                    <div className="div_hand" onClick={() =>
                                        changeScenario(index)
                                    }>
                                        {
                                            item.name === SCENARIOS[2] &&
                                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 17V7" stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13 17V13" stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M1 17V1" stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            // <IcNegetive style={{ height: "20px", width: "20px" }} stroke={item.name === SCENARIOS[selectedScenario] ? '#fff' : 'rgba(255, 255, 255, 0.3)'} />
                                        }
                                    </div>
                                }

                            </div>
                            // <div className={`scenario sm_sce1 ${index !== 2 ? 'mb-4' : ''}`} key={index}>
                            //     <div className="d-flex justify-content-between align-items-center">
                            //         <div className="sm_sce_text">{item}</div>
                            //         {
                            //             index === 0 ? (
                            //                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                     <path opacity="0.5" d="M9.33333 0H1.33333C0.593333 0 0 0.6 0 1.33333V10.6667C0 11.4 0.593333 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V2.66667L9.33333 0ZM10.6667 10.6667H1.33333V1.33333H8.78L10.6667 3.22V10.6667ZM6 6C4.89333 6 4 6.89333 4 8C4 9.10667 4.89333 10 6 10C7.10667 10 8 9.10667 8 8C8 6.89333 7.10667 6 6 6ZM2 2H8V4.66667H2V2Z" fill="white" />
                            //                 </svg>
                            //             ) : (
                            //                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                     <path d="M10.5 7.5V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V7.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            //                     <path d="M3.5 5L6 7.5L8.5 5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            //                     <path d="M6 7.5V1.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            //                 </svg>
                            //             )
                            //         }
                            //     </div>

                            //     <div className="sm_sce_delete">
                            //         <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //             <path d="M1 2.75H1.91667H9.25" stroke="white" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            //             <path d="M3.29175 2.74984V1.83317C3.29175 1.59006 3.38833 1.3569 3.56023 1.18499C3.73214 1.01308 3.9653 0.916504 4.20842 0.916504H6.04175C6.28486 0.916504 6.51802 1.01308 6.68993 1.18499C6.86184 1.3569 6.95842 1.59006 6.95842 1.83317V2.74984M8.33342 2.74984V9.1665C8.33342 9.40962 8.23684 9.64278 8.06493 9.81469C7.89302 9.98659 7.65986 10.0832 7.41675 10.0832H2.83341C2.5903 10.0832 2.35714 9.98659 2.18523 9.81469C2.01333 9.64278 1.91675 9.40962 1.91675 9.1665V2.74984H8.33342Z" stroke="white" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            //             <path d="M4.20825 5.0415V7.7915" stroke="white" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            //             <path d="M6.04175 5.0415V7.7915" stroke="white" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            //         </svg>
                            //     </div>
                            // </div>
                        ))
                    }

                </div>

            </div>
        </div>
    );
}

export default SimulationScenarios;