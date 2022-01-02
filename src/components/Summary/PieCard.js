import {Card, CardBody, CardFooter} from "reactstrap";
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'
import Loader from "react-loader-spinner";


export const PieCard = (props) => {
    const {data, title = '', subtitle = '', isLoading = true} = props || {}
    const {categories, brandCounts, yAxisText} = data || {}
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
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxisText
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">Count:&nbsp;</td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Brands',
            data: brandCounts

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
                    !success && !isLoading && errorMessage &&
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
