import API from "../network/api/API";
import * as Constants from '../constants'
import {getDataForDisplay} from "./SummaryUtils";
import {ENDPOINT_LOYALTY_TRANSACTIONS, ENDPOINT_ORDERS, ENDPOINT_RESELLERS, ENDPOINT_REVENUE} from "../constants";

export const getLoyaltyTransactionData = async (startDate, endDate, endPoint) => {
    let header = Constants.DEFAULT_HEADER
    let retVal;
    await API.post(endPoint,
        {startDate, endDate},
        {header})
        .then(response => {
            console.log('points response  is ', response.data);
            let {dateArray, seriesData} = getDataForDisplay(response);
            const yAxisText = getYAxisText(endPoint);
            retVal = {dateArray, seriesData, yAxisText, success: 'true'}
        })
        .catch(error => {
            retVal = {success: false, errorMessage: error.message}
        })
    return retVal;
}

const getYAxisText = (endPoint) => {
    switch (endPoint) {
        case  ENDPOINT_LOYALTY_TRANSACTIONS:
            return 'Points'
        case   ENDPOINT_RESELLERS:
            return 'Reseller count'
        case  ENDPOINT_ORDERS:
            return 'Order count'
        case ENDPOINT_REVENUE:
            return 'Amount'
        default:
            return ''
    }
}
