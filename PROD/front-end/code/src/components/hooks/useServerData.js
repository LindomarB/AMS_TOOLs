import { useContext, useState } from "react";
import FetcherContext from "../context/fetcherContext/FetcherContext";

function getKeysets(keysets) {
    if(!keysets) {
        return {_id: '$lt'};
    } else if(!Object.keys(keysets).some(keyset => keyset === '_id')) {
        const newKeysets = structuredClone(keysets);
        newKeysets._id = '$lt';
        return newKeysets;
    }

    return keysets;
}

function useServerData(props) {
    const [data, setData] = useState([]);
    const [keysets, setKeysets] = useState(props.keysets || {_id: '$lt'});
    const [lastId, setLastId] = useState();
    const [query, setQuery] = useState(props.query || {});
    const [lastKeyset, setLastKeyset] = useState();
    const fetcher = useContext(FetcherContext);

    const querySettings = () => {
        const settings = props.querySettings || {};
        return {
            ...settings,
            limit: settings.limit || 20
        };
    }

    const get = async (newQuery) => {
        const res = await fetcher[props.fetcher.method](
            {
                query: newQuery || query, 
                settings: querySettings()
            }, 
            props.fetcher.settings
        );

        if(res.ok) {
            setLastKeyset(getLastKeyset(res.data));
            setData(res.data);
        }

        return {
            ...res,
            newData: res.data
        };
    }

    const getNext = async () => {
        if(!lastKeyset) return;

        const res = await fetcher[props.fetcher.method](
            {
                query: insertKeysetsOnQuery(), 
                settings: querySettings()
            }, 
            {
                ...props.fetcher.settings,
                awaitingFlag: `${props.fetcher.method}Next`
            }
            
        );

        if(res.ok) {
            setLastKeyset(getLastKeyset(res.data));
            setData(curSt => {
                const newData = structuredClone(curSt);
                newData.push(...res.data);
                return newData;
            });
        }

        return res;
    }

    const refresh = async () => {
        const settings = querySettings();
        delete settings.limit;

        const res = await fetcher[props.fetcher.method](
            {
                query: insertKeysetsOnQuery(true), 
                settings
            }, 
            props.fetcher.settings
        );

        if(res.ok) {
            setData(res.data);
        }

        return {
            ...res,
            newData: res.data
        };
    }

    const insertKeysetsOnQuery = (invertOperator) => {
        const keysetsQuery = structuredClone(query);

        for(let field in lastKeyset) {
            let operator = keysets[field];

            if(invertOperator) {
                operator = operator === '$gt'? '$lte' : '$gte';
            }

            if(keysetsQuery[field]) {
                keysetsQuery.$and = [
                    {[field]: keysetsQuery[field]}, 
                    {$or: [
                        {[field]: {
                            [operator]: lastKeyset[field]
                        }},
                        {
                            [field]: lastKeyset[field],
                            _id: {[operator]: lastId}
                        }
                    ]}
                    
                ];
                delete keysetsQuery[field];
            } else {
                keysetsQuery[field] = {[operator]: lastKeyset[field]};
            }
        }  

        return keysetsQuery;
    }

    const getLastKeyset = (data) => {
        if(!data.length) return null;

        const lastItem = data[data.length -1];
        const keysetFields = Object.keys(keysets);   
        setLastId(lastItem._id);

        return keysetFields.reduce((keysets, field) => {
            const fieldKeys = field.split('.');

            const keyset = fieldKeys.reduce((value, field) => {
                value = value[field];
                return value;
            }, lastItem);
            
            keysets[field] = keyset;
            return keysets;
        }, {});
    }

    const updateQuery = async (query) => {
        setQuery(query);
        return await get(query);
    }

    const clear = () => {
        setData([]);
    }

    return {
        data,
        get,
        getNext,
        updateQuery,
        refresh,
        clear
    };
}

export default useServerData;