import React from "react";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const SimulationBarChart = ({ id, barData, setChart }) => {

    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dark);
    const DUMMY_DATA = [
        {
            category: 'Revenue',
            optimist: 85000,
            middle: 40000,
            negetive: 45000
        },
        {
            category: 'Employees',
            optimist: 120000,
            middle: 78000,
            negetive: 42000
        },
        {
            category: 'Digital footprint',
            optimist: 82000,
            middle: 39000,
            negetive: 25000
        },
        {
            category: 'Social Score',
            optimist: 83000,
            middle: 110000,
            negetive: 55000
        }
    ];

    React.useEffect(() => {
        if (barData.length > 0) {

            let chart = am4core.create(id, am4charts.XYChart)
            chart.colors.step = 2;
            chart.colors.list = [
                am4core.color("#64e9b7"),
                am4core.color("#e778fb"),
                am4core.color("#986efa"),
                // am4core.color("#0267b6"),
                // am4core.color("#a200c4"),
                // am4core.color("#F9F871"),
            ];

            // chart.legend = new am4charts.Legend()
            // chart.legend.position = 'bottom'
            // chart.legend.paddingBottom = 20
            // chart.legend.labels.template.maxWidth = 95

            let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
            xAxis.dataFields.category = 'category'
            xAxis.renderer.cellStartLocation = 0.1
            xAxis.renderer.cellEndLocation = 0.9
            xAxis.renderer.grid.template.location = 0;

            let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
            yAxis.min = 0;

            chart.data = barData.length > 0 ? barData : DUMMY_DATA;

            const createSeries = (value, name) => {
                // var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                // valueAxis.tooltip.disabled = true;  

                let series = chart.series.push(new am4charts.ColumnSeries())
                series.dataFields.valueY = value
                series.dataFields.categoryX = 'category'
                series.name = name
                series.columns.template.width = am4core.percent(30);
                series.events.on("hidden", arrangeColumns);
                series.events.on("shown", arrangeColumns);

                // series.yAxis = valueAxis;
                // valueAxis.renderer.line.stroke = series.stroke;
                // valueAxis.renderer.labels.template.fill = series.stroke;

                let bullet = series.bullets.push(new am4charts.LabelBullet())
                bullet.interactionsEnabled = false
                bullet.dy = 30;
                // bullet.label.text = '{valueY}'
                bullet.label.fill = am4core.color('#ffffff')

                return series;
            }

            const arrangeColumns = () => {

                let series = chart.series.getIndex(0);

                let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
                if (series.dataItems.length > 1) {
                    let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                    let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                    let delta = ((x1 - x0) / chart.series.length) * w;
                    if (am4core.isNumber(delta)) {
                        let middle = chart.series.length / 2;

                        let newIndex = 0;
                        chart.series.each(function (_series) {
                            if (!_series.isHidden && !_series.isHiding) {
                                _series.dummyData = newIndex;
                                newIndex++;
                            }
                            else {
                                _series.dummyData = chart.series.indexOf(_series);
                            }
                        })
                        let visibleCount = newIndex;
                        let newMiddle = visibleCount / 2;

                        chart.series.each(function (series_item) {
                            let trueIndex = chart.series.indexOf(series_item);
                            let _newIndex = series_item.dummyData;

                            let dx = (_newIndex - trueIndex + middle - newMiddle) * delta

                            series_item.animate({ property: "dx", to: dx }, series_item.interpolationDuration, series_item.interpolationEasing);
                            series_item.bulletsContainer.animate({ property: "dx", to: dx }, series_item.interpolationDuration, series_item.interpolationEasing);
                        })
                    }
                }
            }

            createSeries('optimist', 'Scenario optimist');
            createSeries('middle', 'Scenario middle');
            createSeries('negetive', 'Scenario negetive');

            setChart(chart);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barData, setChart])

    return (
        <>
            {
                barData && barData.length > 0 && (
                    <div id={id} style={{ height: "300px" }}></div>
                )
            }
            {
                barData.length === 0 && (
                    <div className="m-5" style={{ textAlign: "center" }}>
                        <i className="fa fa-spinner fa-spin" style={{ fontSize: 30, color: '#1ee8b7' }}></i>
                    </div>
                )
            }
        </>
    );
}
export default SimulationBarChart;