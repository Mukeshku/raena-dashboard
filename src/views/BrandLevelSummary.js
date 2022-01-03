import React, {useEffect, useState} from "react";
import {Button, Col, Row,} from "reactstrap";
import {SummaryCard} from "../components/Summary/SummaryCard";
import RangeDatePicker from "../components/common/RangeDatePicker";
import {getLoyaltyTransactionData, getMatchStringForBrands, getMatchStringForReseller} from "../Utils/ApiUtils";

import {
  ENDPOINT_BRAND_DATA,
  ENDPOINT_LOYALTY_TRANSACTIONS,
  ENDPOINT_ORDERS,
  ENDPOINT_REVENUE,
  MIN_SEARCH_LENGTH_FOR_RESELLER,
  USERS_PAGE_END_POINTS
} from "../constants";
import {getDifferenceInDays} from "../Utils/DateUtils";
import AsyncMulti from "../components/MutiSelect/AsyncMulti";
import {BarCard} from "../components/Summary/BarCard";

export const Brand = () => {
  //Initialize date.
  const MAX_DATE_DIFF = 30
  const initialStartDate = new Date(new Date().setDate(new Date().getDate() - MAX_DATE_DIFF));
  const initialEndDate = new Date();

  const [pointsData, setPointsData] = useState({})
  const [revenueData, setRevenueData] = useState({})
  const [ordersData, setOrdersData] = useState({})
  const [brandData, setBrandData] = useState({})
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [selectedBrandIds, setSelectedBrandIds] = useState([])

  const setData = (response, endPoint) => {
    switch (endPoint) {
      case  ENDPOINT_LOYALTY_TRANSACTIONS:
        setPointsData(response);
        break;
      case   ENDPOINT_BRAND_DATA:
        setBrandData(response);
        break;
      case  ENDPOINT_ORDERS:
        setOrdersData(response);
        break;
      case ENDPOINT_REVENUE:
        setRevenueData(response);
        break;
    }
  }

  const getChartData = () => {
    USERS_PAGE_END_POINTS.forEach(endPoint => {
      getLoyaltyTransactionData(startDate, endDate, endPoint, null, selectedBrandIds).then(response => {
        setData(response, endPoint);
      })
    })
  }

  useEffect(() => {
    getChartData();
  }, []);


  function resetData() {
    setRevenueData({});
    setBrandData({});
    setOrdersData({});
    setPointsData({})
  }

  const onDateChange = ({startDate, endDate}) => {
    if (endDate && startDate) {
      const diffInDays = getDifferenceInDays(startDate, endDate);

      if (diffInDays >= 0) {
        setStartDate(startDate.toISOString());
        setEndDate(endDate.toISOString());
      } else {
        alert("end Date always greater than equal start Date");
      }
    }
  }

  const hitApi = async (inputString) => {
    return await getMatchStringForBrands(inputString);
  }

  const onResellerItemChange = (selectedItems) => {
    setSelectedBrandIds(selectedItems);
  }

  const onSubmitButtonClick = () => {
    resetData();
    getChartData();
  }

  return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <RangeDatePicker onDateChange={onDateChange} startDate={startDate} endDate={endDate}/>
            </Col>
            <Col md="3">
              <span>&nbsp;Search Brand &nbsp; </span>
              <AsyncMulti
                  hitApi={hitApi}
                  minSearchTextLength={MIN_SEARCH_LENGTH_FOR_RESELLER}
                  onItemChange={onResellerItemChange}
              />
            </Col>
            <Col md="3">
              <Button
                  onClick={onSubmitButtonClick}
                  color="primary">SUBMIT</Button>
            </Col>
          </Row>
          <hr
              style={{
                color: 'rgba(0,0,0,0.02)',
                backgroundColor: 'rgba(0,0,0,0.03)',
                height: 1
              }}
          />
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
              <BarCard
                  data={brandData}
                  title={'Revenue by brand'}
                  subtitle={''}
                  isLoading={Object.keys(brandData).length === 0}
              />
            </Col>
          </Row>
        </div>
      </>
  );
}

export default Brand;

