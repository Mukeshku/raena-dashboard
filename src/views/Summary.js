import React, {useEffect, useState} from "react";
import {Col, Row,} from "reactstrap";
import {SummaryCard} from "../components/Summary/SummaryCard";
import RangeDatePicker from "../components/common/RangeDatePicker";
import API from "../network/api/API";
import {getDataForDisplay} from "../Utils/SummaryUtils";

export const Summary = () => {
    const [pointsData, setPointsData] = useState({})
    const [revenueData, setRevenueData] = useState({})
    const [ordersData, setOrdersData] = useState({})
    const [resellerData, setResellersData] = useState({})

    useEffect(() => {

        //HIt API to fetch data;

        let body = {
            "startDate": "2021-12-09 10:00:34.228Z",
            "endDate": "2021-12-29 10:00:35.228Z"
        }

        let headers = {
            'Access-Control-Allow-Origin': 'http://localhost:8025'
        }
        API.post('resellers/loyaltyTransactions',
            {
                "startDate": "2021-12-09 10:00:34.228Z",
                "endDate": "2021-12-29 10:00:35.228Z"
            },
            {headers})
            .then(response => {
                console.log('points response  is ', response.data);
                let {dateArray, seriesData} = getDataForDisplay(response);
                setPointsData({
                        dateArray,
                        seriesData,
                        yAxisText: "Points"
                    }
                )
            })
        //  hitting revenve api
        API.post('resellers/revenue',
            {
                "startDate": "2021-12-09 10:00:34.228Z",
                "endDate": "2021-12-29 10:00:35.228Z"
            },
            {headers})
            .then(response => {
                console.log('Revenve response  is ', response.data);
                let {dateArray, seriesData} = getDataForDisplay(response);
                setRevenueData({
                        dateArray,
                        seriesData,
                        yAxisText: "Amount"
                    }
                )
            })
        //  hitting orders api
        API.post('resellers/orders',
            {
                "startDate": "2021-12-09 10:00:34.228Z",
                "endDate": "2021-12-29 10:00:35.228Z"
            },
            {headers})
            .then(response => {
                console.log('Ordrs response  is ', response.data);
                let {dateArray, seriesData} = getDataForDisplay(response);
                setOrdersData({
                        dateArray,
                        seriesData,
                        yAxisText: "Order count"
                    }
                )
            })
        //  hitting reseller api
        API.post('resellers/resellers',
            {
                "startDate": "2021-12-09 10:00:34.228Z",
                "endDate": "2021-12-29 10:00:35.228Z"
            },
            {headers})
            .then(response => {
                console.log('resellers response  is ', response.data);
                let {dateArray, seriesdata} = getDataForDisplay(response);
                setResellersData({
                        dateArray,
                        seriesdata,
                        yAxisText: "Reseller count"
                    }
                )
            })
    }, []);


    return (
        <>
            <div className="content">
                <RangeDatePicker/>
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

