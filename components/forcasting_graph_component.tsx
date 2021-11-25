import { useEffect, useState } from 'react';
import Image from 'next/image';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { LineSeries, XYChart, ValueAxis, DateAxis, XYCursor } from "@amcharts/amcharts4/charts";
import { create, useTheme, Scrollbar, color, ColorSet } from "@amcharts/amcharts4/core";

const ForcastingGraphComponent = ({
    id,
    name,
    data,
    selectedFactor,
    startDate,
    nextDate,
    endDate,
    setSelectedFactor
} : {
    id:any,
    data:any,
    name:any,
    selectedFactor:any,
    startDate:any,
    nextDate:any,
    endDate:any,
    setSelectedFactor:any,
}) => {
    const [factor, setFactor] = useState([])

    // useTheme(am4themes_animated);
    useTheme(am4themes_dark);

    function am4themes_myTheme(target:any) {
        if (target instanceof ColorSet) {
            target.list = [
                color("#fdd400"),
                color("#820f7a")
            ];
        }
    }

    useTheme(am4themes_myTheme);

    useEffect(() => {
        chartFactor()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selectedFactor]);

    const chartFactor = () => {
        if (data) {
            var chart = create(`${id}`, XYChart);
            chart.hiddenState.properties.opacity = 0;

            chart.colors.list = [
                color("#b2019d"),
                color("#e29635"),
                color("#00b380"),
                color("#0267b6"),
                color("#a200c4"),
                color("#F9F871"),
            ];

            if (data.length > 1)
                chart.data = data[1].dateAxis;

            var dateAxis = chart.xAxes.push(new DateAxis());
            // eslint-disable-next-line no-unused-vars
            var valueAxis = chart.yAxes.push(new ValueAxis());
            valueAxis.numberFormatter.numberFormat = "#.0a"

            valueAxis.renderer.line.stroke = color("#00000000");
            valueAxis.renderer.labels.template.fill = color("#00000000");

            var listT = data
            for (var i = 0; i < data.length; i++) {
                addLineChart(chart, listT, i, data[i].data, data[i].name, dateAxis, false, startDate, nextDate, endDate)
            }

            if (listT.length > 0)
                setFactor(listT)

            chart.cursor = new XYCursor();
            chart.cursor.xAxis = dateAxis;
            chart.scrollbarX = new Scrollbar();
        }
    }

    const addLineChart = (chart:any, 
        list:any, pos:any, data:any, name:any, dateAxis:any, opposite:any, startDate:any, 
        nextDate:any, endDate:any) => {
        var lineSeries = chart.series.push(new LineSeries());
        lineSeries.data = data
        lineSeries.dataFields.dateX = "date";
        lineSeries.dataFields.valueY = "value";
        lineSeries.name = name
        lineSeries.legendSettings.valueText = "{valueY}";
        // lineSeries.stroke = color("#fdd400");
        lineSeries.fillOpacity = 0.1
        lineSeries.propertyFields.strokeDasharray = "lineDash";
        lineSeries.tooltip.label.textAlign = "middle";
        lineSeries.tooltipText = "Value :{valueY.value}";
        lineSeries.tooltip.background.fill = lineSeries.stroke

        list[pos].color = lineSeries.stroke

        var range = dateAxis.createSeriesRange(lineSeries);
        range.date = new Date(startDate)
        range.endDate = new Date(endDate)
        range.contents.fillOpacity = 0.1

        var rangeLine = dateAxis.axisRanges.create();

        rangeLine.date = new Date(startDate)
        rangeLine.endDate = new Date(nextDate);
        rangeLine.axisFill.fill = color("#0267b6");
        rangeLine.axisFill.fillOpacity = 1;

        var series = chart.series.push(new LineSeries());
        series.data = data
        series.dataFields.dateX = "date";
        series.dataFields.openValueY = "open";
        series.dataFields.valueY = "close";
        series.stroke = color("#00000000");

        series.tooltipText = "Max: {openValueY.value} Min: {valueY.value}";
        series.tooltip.background.fill = lineSeries.stroke
        series.sequencedInterpolation = true;
        series.fillOpacity = 0.2;
        series.defaultState.transitionDuration = 1000;
        series.tensionX = 0.8;
        series.hiddenInLegend = true

        var series2 = chart.series.push(new LineSeries());
        series2.data = data
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "open";
        series2.sequencedInterpolation = true;
        series2.stroke = color("#00000000");
        series2.defaultState.transitionDuration = 1500;
        series2.tensionX = 0.8;

        if (selectedFactor === name) {
            lineSeries.strokeWidth = 4;

            var valueAxis = chart.yAxes.push(new ValueAxis());
            valueAxis.tooltip.disabled = true;

            if (chart.yAxes.indexOf(valueAxis) !== 0) {
                valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
            }

            lineSeries.yAxis = valueAxis
            series.yAxis = valueAxis
            series2.yAxis = valueAxis

            valueAxis.renderer.line.stroke = lineSeries.stroke;
            valueAxis.renderer.labels.template.fill = lineSeries.stroke;
        } else {
            lineSeries.strokeWidth = 1;
        }
    }

    return (
        <div className="d-flex" style={{ width: "100%" }}>

            <div id={id} className="chartdiv"></div>

            <div className="div_column" style={{ width: "200px" }}>
                <div className="poppins-medium font-white font-start">Simulation</div>

                <div className="radio_scrollbar">
                    {
                        data && data.map((item:any, index:any) => (
                            <div className="d-flex radio-text" onClick={() => setSelectedFactor(item.name)} key={index}>
                                {
                                    selectedFactor === item.name ?
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="14" height="14" rx="4" fill={typeof item.color !== 'undefined' ? item.color : "#1ee8b657"} />
                                            <rect x="0.5" y="0.5" width="13" height="13" rx="3.5" stroke="url(#paint0_linear)" strokeOpacity="0.4" />
                                            <defs>
                                                <linearGradient id="paint0_linear" x1="7" y1="3.76811e-07" x2="18.264" y2="17.8104" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#1ee8b657" />
                                                    <stop offset="1" stopColor="#1ee8b657" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        :
                                        <svg width="14" height="14" viewBox="0 0 14 14"
                                            stroke={typeof item.color !== 'undefined' ? item.color : "#1ee8b657"}
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="13" height="13" rx="3.5"
                                                stroke={typeof item.color !== 'undefined' ? item.color : "#1ee8b657"}
                                                strokeOpacity="0.8" />
                                            <defs>
                                                <linearGradient id="paint0_linear" x1="7" y1="3.76811e-07" x2="18.264" y2="17.8104" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#1ee8b7" />
                                                    <stop offset="1" stopColor="#1ee8b7" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                }
                                {/* <img src={selectedMarketFactor === item.name ? ic_checkbox_selected : ic_checkbox_unselected} alt="" /> */}
                                <div className="poppins-medium font-white" style={{ marginLeft: "2px" }}>{item.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ForcastingGraphComponent;