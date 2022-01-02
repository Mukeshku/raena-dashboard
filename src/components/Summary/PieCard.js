import {Card, CardBody, CardFooter} from "reactstrap";
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'
import Loader from "react-loader-spinner";


export const PieCard = (props) => {
    const {data, title = '', subtitle = '', isLoading = true} = props || {}
    const {success, errorMessage} = data || {}
    //Add exporting module.
    //This will aad export feature.
    if (typeof Highcharts === 'object') {
        Highcharts.setOptions({
            lang: {
                numericSymbols: [' Th', ' M', ' B', ' T']
            }
        });
        HighchartsExporting(Highcharts)
        ExportData(Highcharts);
    }
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Sogou Explorer',
                y: 1.64
            }, {
                name: 'Opera',
                y: 1.6
            }, {
                name: 'QQ',
                y: 1.2
            }, {
                name: 'Other',
                y: 2.61
            }]
        }]
    }

    return (
        <Card className="card-chart">
            <CardBody>

                {isLoading &&
                <table>
                    <tr>
                        <td><Loader
                            type="Grid"
                            color="#00BFFF"
                            height={10}
                            width={10}
                        /></td>
                        <td>&nbsp;&nbsp;Please wait while we fetch data.</td>
                    </tr>
                </table>
                }

                {
                    !success &&  !isLoading && errorMessage &&
                        <div>
                            {errorMessage}
                        </div>
                }

                {!isLoading && success &&
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
                }
            </CardBody>
        </Card>
    )
}
