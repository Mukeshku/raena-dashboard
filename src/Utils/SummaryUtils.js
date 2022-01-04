import * as Constants from "../constants";

export const getDataForDisplay = (response) => {
    let dateArray = [];
    let goldArray = [];
    let silverArray = [];
    let bronzeArray = [];
    let i = 0;

    response.data?.forEach(datapoint => {
        if (datapoint._id && datapoint.tiers.length) {
            dateArray[i] = datapoint._id;
            let tierMap = new Map();
            datapoint.tiers.forEach(tier => {
                tierMap.set(tier.tierId, tier.total);
            });
            goldArray[i] = tierMap.get(Constants.TIER_GOLD) || 0;
            silverArray[i] = tierMap.get(Constants.TIER_SILVER) || 0;
            bronzeArray[i] = tierMap.get(Constants.TIER_BRONZE) || 0;
            i++;

        }
    });
    const seriesData = [
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
    return {dateArray, seriesData};
}

export const getBrandDataForDisplay = (response) => {
    const {data:responseData} = response || []
    let categories = [];
    let brandCounts = [];
    responseData.forEach(item => {
        const {brandId, count, skuId} = item || {}
        categories.push(brandId || skuId);
        brandCounts.push(count);
    })

    return {categories, brandCounts};
}
