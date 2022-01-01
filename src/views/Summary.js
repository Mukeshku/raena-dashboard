import React, {useEffect, useState} from "react";
import {Col, Row,} from "reactstrap";
import {SummaryCard} from "../components/Summary/SummaryCard";
import RangeDatePicker from "../components/common/RangeDatePicker";
import {getLoyaltyTransactionData} from "../Utils/ApiUtils";

import {
    ENDPOINT_LOYALTY_TRANSACTIONS,
    ENDPOINT_ORDERS,
    ENDPOINT_RESELLERS,
    ENDPOINT_REVENUE,
    SUMMARY_PAGE_END_POINTS
} from "../constants";
import {getDifferenceInDays} from "../Utils/DateUtils";

export const Summary = () => {
    const [pointsData, setPointsData] = useState({})
    const [revenueData, setRevenueData] = useState({})
    const [ordersData, setOrdersData] = useState({})
    const [resellerData, setResellersData] = useState({})
    const [startDate, setStartDate] = useState('2021-12-09 10:00:34.228Z');
    const [endDate, setEndDate] = useState('2021-12-29 10:00:35.228Z');

    useEffect(() => {
        function setData(response, endPoint) {
            switch (endPoint) {
                case  ENDPOINT_LOYALTY_TRANSACTIONS:
                    setPointsData(response);
                    break;
                case   ENDPOINT_RESELLERS:
                    setResellersData(response);
                    break;
                case  ENDPOINT_ORDERS:
                    setOrdersData(response);
                    break;
                case ENDPOINT_REVENUE:
                    setRevenueData(response);
                    break;
            }
        }


        SUMMARY_PAGE_END_POINTS.forEach(endPoint => {
            getLoyaltyTransactionData(startDate, endDate, endPoint).then(response => {
                const {success} = response || {}
                if (success) {
                    setData(response, endPoint);
                }
            })
        })
    }, [startDate, endDate]);

    const onDateChange = ({startDate, endDate}) => {
        if (endDate && startDate){
            const diffInDays = getDifferenceInDays(startDate, endDate);
            console.log(startDate.toISOString());
            console.log(endDate.toISOString());

            if (diffInDays > 0){
                setStartDate(startDate.toISOString());
                setEndDate(endDate.toISOString());
            }
        }
    }

    return (
        <>
            <div className="content">

                <RangeDatePicker onDateChange={onDateChange} />

                <span>&nbsp;&nbsp;</span>
                <Row>
                    <Col md="6">
                        <SummaryCard data={pointsData} title={'Points Generated'} subtitle={''}/>
                    </Col>
                    <Col md="6">
                        <SummaryCard data={revenueData} title={'Revenue'} subtitle={''}/>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <SummaryCard data={ordersData} title={'Orders'} subtitle={''}/>
                    </Col>
                    <Col md="6">
                        <SummaryCard data={resellerData} title={'Transacting Users'} subtitle={''}/>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Summary;

