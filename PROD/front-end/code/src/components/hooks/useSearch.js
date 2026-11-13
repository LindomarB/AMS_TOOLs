import { useState } from 'react';

function useSearch(initialData = [], initialKeyword = '') {
    const [keyword, setKeyword] = useState(initialKeyword);
    const [data, setDataState] = useState(initialData);

    const setData = (data) => {
        setDataState(data || []);
    }

    const searchInObject = (object, keyword, ignoreKeys = []) => {
        for(let key in object) {
            if(ignoreKeys.includes(key)) continue;
            const value = object[key];
            const dataType = typeof value;

            switch(dataType) {
                case 'object':
                    if(searchInObject(value, keyword)) return true;
                    break;
                case 'string':
                    if(value.toLowerCase().includes(keyword.toLowerCase())) return true;
                    break;
                case 'number':
                    if(value === keyword) return true;
                    break;
                case 'boolean':
                    if(key.toLowerCase().includes(keyword.toLowerCase())) return true;
                    break;
            }
        }

        return false;
    }

    const result = (ignoreKeys) => {  
        return data.filter(datum =>  {
            const dataType = typeof datum;

            switch(dataType) {
                case 'string':
                    return datum.toLowerCase().includes(keyword.toLowerCase());
                case 'number':
                    return datum === keyword;
                case 'object':
                    return searchInObject(datum, keyword, ignoreKeys);
                default:
                    return false;
            }
        });
    }

    const find = (value) => {
        switch(typeof value) {
            case 'object':
                const key = Object.keys(value)[0];
                const keyword = Object.values(value)[0];

                return data.find(datum => datum[key] === keyword);
            default:
                return data.find(datum => datum === value);
        }
    }

    return {
        keyword,
        setKeyword,
        data,
        setData,
        result,
        find
    };
}

export default useSearch;