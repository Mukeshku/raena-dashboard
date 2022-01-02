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
    //Initialize date.
    const MAX_DATE_DIFF = 30
    const initialStartDate = new Date(new Date().setDate(new Date().getDate() - MAX_DATE_DIFF));
    const initialEndDate = new Date();

    const [pointsData, setPointsData] = useState({})
    const [revenueData, setRevenueData] = useState({})
    const [ordersData, setOrdersData] = useState({})
    const [resellerData, setResellersData] = useState({})
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

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
            getLoyaltyTransactionData(startDate, endDate, endPoint, []).then(response => {
                setData(response, endPoint);
            })
        })
    }, [startDate, endDate]);

    function resetData() {
        setRevenueData({});
        setResellersData({});
        setOrdersData({});
        setPointsData({})
    }

    const onDateChange = ({startDate, endDate}) => {
        if (endDate && startDate) {
            const diffInDays = getDifferenceInDays(startDate, endDate);

            if (diffInDays >= 0) {
                setStartDate(startDate.toISOString());
                setEndDate(endDate.toISOString());
                resetData();
            }else{
                alert("end Date always greater than equal start Date")
            }
        }
    }

    return (
        <>
            <div className="content">

                <RangeDatePicker onDateChange={onDateChange} startDate={startDate} endDate={endDate}/>

                <span>&nbsp;&nbsp;</span>
                <Row>
                    <Col md="6">
                        <SummaryCard
                            data={pointsData}
                            title={'Points Generated'}
                            subtitle={''}
                            isLoading={Object.keys(pointsData).length === 0}/>
                    </Col>
                    <Col md="6">
                        <SummaryCard data={revenueData}
                                     title={'Revenue'}
                                     subtitle={''}
                                     isLoading={Object.keys(revenueData).length === 0}/>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <SummaryCard
                            data={ordersData}
                            title={'Orders'}
                            subtitle={''}
                            isLoading={Object.keys(ordersData).length === 0}
                        />
                    </Col>
                    <Col md="6">
                        <SummaryCard
                            data={resellerData}
                            title={'Transacting Users'}
                            subtitle={''}
                            isLoading={Object.keys(resellerData).length === 0}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Summary;

