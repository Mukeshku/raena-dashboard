import API from "../network/api/API";
import * as Constants from '../constants'
import {getBrandDataForDisplay, getDataForDisplay} from "./SummaryUtils";
import {
    ENDPOINT_BRAND_DATA,
    ENDPOINT_LOYALTY_TRANSACTIONS,
    ENDPOINT_ORDERS,
    ENDPOINT_RESELLERS,
    ENDPOINT_REVENUE
} from "../constants";

let header = Constants.DEFAULT_HEADER;

export const getLoyaltyTransactionData = async (startDate, endDate, endPoint, selectedResellerIds, selectedBrandIds) => {
    let retVal;
    await API.post(endPoint,
        {startDate, endDate, selectedResellerIds, selectedBrandIds},
        {header})
        .then(response => {
            retVal = parseResponse(response, endPoint)
        })
        .catch(error => {
            retVal = {success: false, errorMessage: error.message}
        })
    return retVal;
}

const parseResponse = (response, endPoint) => {
    let retVal;
    const yAxisText = getYAxisText(endPoint);
    if (endPoint === ENDPOINT_BRAND_DATA) {
        let {categories, brandCounts} = getBrandDataForDisplay(response);
        retVal = {categories, brandCounts, yAxisText, success: 'true'}
    } else {
        let {dateArray, seriesData} = getDataForDisplay(response);
        retVal = {dateArray, seriesData, yAxisText, success: 'true'}
    }
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
        case ENDPOINT_BRAND_DATA:
            return 'Brands Amount'
        default:
            return ''
    }
}

async function getFilterData(endPoint) {
    let retVal;
    await API.get(endPoint,
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

export const getMatchStringForReseller = async (inputString) => {
    return await getFilterData('/resellers/all/' + inputString);
}

export const getMatchStringForBrands = async (inputString) => {
    return await getFilterData('/lookup/all/' + inputString);
}
