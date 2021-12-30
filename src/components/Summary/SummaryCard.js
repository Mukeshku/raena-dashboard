import {Card, CardBody, CardFooter, CardHeader, CardTitle} from "reactstrap";
import {dashboardNASDAQChart} from "../../variables/charts";
import {Line} from "react-chartjs-2";

export const SummaryCard = (props) =>{
    const {dataPoints, title = '', subtitle = ''} = props || {}
    return (
        <Card className="card-chart">
            <CardHeader>
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
            </CardFooter>
        </Card>
    )
}
