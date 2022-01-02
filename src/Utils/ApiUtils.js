import API from "../network/api/API";
import * as Constants from '../constants'
import {getDataForDisplay} from "./SummaryUtils";
import {ENDPOINT_LOYALTY_TRANSACTIONS, ENDPOINT_ORDERS, ENDPOINT_RESELLERS, ENDPOINT_REVENUE} from "../constants";

let header = Constants.DEFAULT_HEADER;

export const getLoyaltyTransactionData = async (startDate, endDate, endPoint, selectedResellerIds) => {
    let retVal;
    await API.post(endPoint,
        {startDate, endDate, selectedResellerIds},
        {header})
        .then(response => {
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
            return 'Reseller Count'
        case  ENDPOINT_ORDERS:
            return 'Order Count'
        case ENDPOINT_REVENUE:
            return 'Amount'
        default:
            return ''
    }
}

export const getMatchStringForReseller = async (inputString) => {
    let retVal;
    await API.get('/resellers/all/' + inputString,
        {header})
        .then(response => {
            const {data} = response || {}
            retVal = data;
        })
        .catch(error => {
            retVal = {success: false, errorMessage: error.message}
        })
    return retVal;
}
