import {Card, CardBody, CardFooter} from "reactstrap";
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'
import Loader from "react-loader-spinner";


export const SummaryCard = (props) => {
    const {data, title = '', subtitle = '', isLoading = true} = props || {}
    const {success, errorMessage} = data || {}
    console.log(data, title);
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
            categories: data.dateArray//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: data.yAxisText
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
        series: data.seriesData
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
                            erroor {errorMessage}
                        </div>
                }

                {!isLoading && success &&
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
                }
            </CardBody>
            {/* <CardHeader>
                <CardTitle tag="h5">{title}</CardTitle>
                <p className="card-category">{subtitle}</p>
            </CardHeader>
            <CardBody>
                <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </CardBody>
            <CardFooter>
                <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                </div>
            </CardFooter>*/}
        </Card>
    )
}
