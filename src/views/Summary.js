import React, {useEffect, useState} from "react";
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
import API from "../network/api/API";

export const Summary = () => {
    const [pointsData,setPointsData] = useState({})
    const [revenueData,setRevenueData] = useState({})
    const [ordersData,setOrdersData] = useState({})
    const [resellerData,setResellersData] = useState({})
    //const [data,setData] = useState([])
    useEffect(() => {
        //HIt API to fetch data;
        console.log('ASHISH fetching API');
        let body  = {
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
        } ,
            {headers})
            .then(response => {
                console.log('points response  is ', response.data);
                let { dateArray, seriesdata } = getDataForDisplay(response);
                setPointsData({
                        dateArray,
                        seriesdata,
                        yAxisText:"Points"
                    }
                )
            })
            //  hitting revenve api
        API.post('resellers/revenue',
        {
           "startDate": "2021-12-09 10:00:34.228Z",
           "endDate": "2021-12-29 10:00:35.228Z"
        } ,
        {headers})
        .then(response => {
            console.log('Revenve response  is ', response.data);
            let { dateArray, seriesdata } = getDataForDisplay(response);
            setRevenueData({
                    dateArray,
                    seriesdata,
                    yAxisText:"Amount"
                }
            )
        })
             //  hitting orders api
             API.post('resellers/orders',
             {
                "startDate": "2021-12-09 10:00:34.228Z",
                "endDate": "2021-12-29 10:00:35.228Z"
             } ,
             {headers})
             .then(response => {
                 console.log('Ordrs response  is ', response.data);
                 let { dateArray, seriesdata } = getDataForDisplay(response);
                 setOrdersData({
                         dateArray,
                         seriesdata,
                         yAxisText:"Order count"
                     }
                 )
             })
                  //  hitting reseller api
        API.post('resellers/resellers',
        {
           "startDate": "2021-12-09 10:00:34.228Z",
           "endDate": "2021-12-29 10:00:35.228Z"
        } ,
        {headers})
        .then(response => {
            console.log('resellers response  is ', response.data);
            let { dateArray, seriesdata } = getDataForDisplay(response);
            setResellersData({
                    dateArray,
                    seriesdata,
                    yAxisText:"Reseller count"
                }
            )
        })
    }, []);


    return (
        <>
            <div className="content">
                <RangeDatePicker />
                <span>&nbsp;&nbsp;</span>
                <Row>
                    <Col md="6">
                        <SummaryCard data={pointsData}  title={'Points Generated'} subtitle={''}/>
                    </Col>
                    <Col md="6">
                        <SummaryCard data={revenueData}  title={'Revenue'} subtitle={''}/>
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
function getDataForDisplay(response) {
    let dateArray = [];
    let goldArray = [];
    let silverArray = [];
    let bronzeArray = [];
    let i = 0;
    let seriesdata = [];
    response.data?.forEach(datapoint => {
        if (datapoint._id && datapoint.tiers.length) {
            dateArray[i] = datapoint._id;
            let tierMap = new Map();
            datapoint.tiers.forEach(tier => {
                tierMap.set(tier.tierId, tier.total);
            });
            goldArray[i] = tierMap.get("bf645e97-8a48-4977-8367-e987489760f9") || 0;
            silverArray[i] = tierMap.get("8eb95d6e-915a-4a91-9c12-fa43db995e19") || 0;
            bronzeArray[i] = tierMap.get("07030fbe-5801-4318-9e97-fe33fa169894") || 0;
            i++;

        }
    });
    seriesdata = [
        {
            name: 'Gold',
            data: goldArray
        },
        {
            name: 'Silver',
            data: silverArray
        },
        {
            name: 'bronze',
            data: bronzeArray
        }
    ];
    return { dateArray, seriesdata };
}

