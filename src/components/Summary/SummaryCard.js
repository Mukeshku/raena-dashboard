import {Card, CardBody, CardFooter, CardHeader, CardTitle} from "reactstrap";
import {dashboardNASDAQChart} from "../../variables/charts";
import {Line} from "react-chartjs-2";
import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'


export const SummaryCard = (props) =>{
    const {dataPoints, title = '', subtitle = ''} = props || {}

    //Add exporting module.
    //This will aad export feature.
    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
        ExportData(Highcharts);
    }

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    }

    return (
        <Card className="card-chart">
            {/*<CardHeader>
                <CardTitle tag="h5">{title}</CardTitle>
                <p className="card-category">{subtitle}</p>
            </CardHeader>*/}
            <CardBody>
                {/*<Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                />*/}
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </CardBody>
            <CardFooter>
                {/*<div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>*/}
                <hr />
                <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                </div>
            </CardFooter>
        </Card>
    )
}
