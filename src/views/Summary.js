/*!

=========================================================
* Paper Summary React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect} from "react";
// react plugin used to create charts
import {Line, Pie} from "react-chartjs-2";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
// core components
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart,
} from "variables/charts.js";
import {SummaryCard} from "../components/Summary/SummaryCard";
import RangeDatePicker from "../components/common/RangeDatePicker";

export const Summary = () => {

    useEffect(() => {
        //HIt API to fetch data;
        console.log('ASHISH fetching API');
    }, []);

    return (
        <>
            <div className="content">
                <RangeDatePicker />
                <span>&nbsp;&nbsp;</span>
                <Row>
                    <Col md="6">
                        <SummaryCard title={'Points Generated'} subtitle={''}/>
                    </Col>
                    <Col md="6">
                        <SummaryCard title={'Revenue'} subtitle={''}/>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <SummaryCard title={'Orders'} subtitle={''}/>
                    </Col>
                    <Col md="6">
                        <SummaryCard title={'Transacting Users'} subtitle={''}/>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Summary;
