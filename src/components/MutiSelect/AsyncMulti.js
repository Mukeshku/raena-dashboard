import React from 'react';

import AsyncSelect from 'react-select/async';
import {isArray, isEmpty} from 'lodash'

const AsyncMulti = ({hitApi, minSearchTextLength, onItemChange}) => {
    const MIN_SEARCH_TEXT_THRESHOLD = minSearchTextLength ? minSearchTextLength : 1;

    const filterColors = (inputValue) => {
        // Handle Fail
        if (!hitApi) {
            console.log('Not API end point is defined. Pass function to this component to Hit API')
        }
        //Hit API
        return hitApi(inputValue).then(response => {
            if (isArray(response) && response.length > 0) {
                return response.map(item => {
                    return {
                        color: "#00B8D9",
                        isFixed: true,
                        label: item,
                        value: item
                    }
                });
            }
        });
    };

    const promiseOptions = (inputValue) => {
        //Do not fetch data if search Item length is less the threshold
        if (isEmpty(inputValue) || inputValue.length < MIN_SEARCH_TEXT_THRESHOLD) {
            return;
        }

        return new Promise((resolve) => {
            resolve(filterColors(inputValue));
        });
    }

    const handleOnChange = (items) => {
        const selectedItems = items.map(item => item.value)
        onItemChange(selectedItems);
    };

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            placeholder={'Min ' + MIN_SEARCH_TEXT_THRESHOLD + ' char required to search'}
            onChange={handleOnChange}
            loadOptions={promiseOptions}
        />
    );

}

export default AsyncMulti;
