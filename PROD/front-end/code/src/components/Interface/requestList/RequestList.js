import React, { useContext, useEffect, useState } from 'react';
import capitalize from '../../../functions/text/capitalize';
import FetcherContext from '../../context/fetcherContext/FetcherContext';
import useInput from '../../hooks/useInput';
import Header from '../header/Header';
import Select from '../inputs/select/Select';
import List from '../list/List';
import style from './RequestList.module.css';
import IconNavbar from '../navigation/IconNavbar/IconNavbar';
import useServerData from '../../hooks/useServerData';
import TextInput from '../inputs/textInput/TextInput';
import wordsSplitter from '../../../functions/text/wordsSplitter';
import DateTimeRangeInput from '../inputs/dateTimeRangeInput/DateTimeRangeInput';
import InfoDrawer from '../drawer/infoDrawer/InfoDrawer';
import Request from '../request/Request';
import UserContext from '../../context/userContext/UserContext';

function RequestList(props) {
    const [filterOptions, setFilterOptions] = useState({
        status: [],
        type: []
    });
    const [currentRequest, setCurrentRequest] = useState();
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);
    const requests = useServerData({
        fetcher: {
            method: 'getRequests'
        },
        querySettings: {
            sort: {'meta.createdOn': -1}
        }
    });

    const search = useInput({name: 'search', defaultValue: ''});
    const period = useInput({name: 'period', defaultValue: ''});
    const status = useInput({name: 'status', defaultValue: ''});
    const type = useInput({name: 'type', defaultValue: ''});
    
    useEffect(() => {
        getFilters();
    }, []);

    useEffect(() => {
        requests.updateQuery(mountQuery());
    }, [search.value, period.value, status.value, type.value]);

    useEffect(() => {
        const request = currentRequest && requests.data.find(request => request._id === currentRequest._id);
        setCurrentRequest(request);
    }, [requests.data]);

    const mountQuery = () => {
        const query = props.query || {};

        if(status.value) query.status = status.value;

        if(type.value) query.type = type.value;

        if(search.value) {
            const $or = wordsSplitter(search.value).
            map(word => ({
                $regex: word,
                $options: 'i'
            })).
            reduce(($or, regex) => {
                $or.push(
                    {'requester.name': regex},
                    {'requester.email': regex},
                    {'requester.cargillId': regex}
                );

                return $or;
            }, []);

            query.$or = $or;
        }

        if(period.value && period.value.from || period.value.to) {
            query['meta.createdOn'] = {};

            if(period.value.from) {
                query['meta.createdOn'] = {$gte: period.value.from.dateTime}
            }

            if(period.value.to) {
                query['meta.createdOn'] = {...query['meta.createdOn'], $lte: period.value.to.dateTime}
            }
        }

        return query;
    }

    const getFilters = async () => {
        const res = await fetcher.getRequestFilters({
            query: props.query,
            settings: {
                filters: [
                    {name: 'status', field: 'status'},
                    {name: 'type', field: 'type'}
                ]
            }
        });

        if(!res.ok) {
            setFilterOptions({
                status: [],
                type: []
            });
            return;
        }

        const filters = res.data;

        const newFilters = {
            status: [{value: '', label: 'All Status'}], 
            type: [{value: '', label: 'All Types'}]
        };

        for(let filter in filters) {
            newFilters[filter].push(
                ...filters[filter].sort().map(
                    filter => ({value: filter, label: capitalize(filter)})
                )
            );
        }

        if(filters.status && !filters.status.includes(status.value)) {
            status.reset();
        }

        if(filters.type && !filters.type.includes(type.value)) {
            type.reset();
        }

        setFilterOptions(newFilters);
    }    

    const handleOnClickRequest = (request) => {
        if(currentRequest && currentRequest._id === request._id) {
            setCurrentRequest(null);
        } else {
            setCurrentRequest(request);
        }
    }

    const handleOnRespond = async () => {
        requests.refresh();
    }

    const handleOnCloseRequest = () => {
        setCurrentRequest(null);
    }

    const handleOnCleanFilters = () => {
        search.reset();
        period.reset();
        status.reset();
        type.reset();
    }

    const refresh = async () => {
        await getFilters();
        await requests.get();
        await userCtx.refresh();
    }

    const requestItems = requests.data.map(request => (
        <props.listItem.type
            key={request._id} 
            request={request} 
            onClick={() => handleOnClickRequest(request)}
            active={currentRequest && currentRequest._id === request._id}
        />
    ));

    const buttons = [
        {
            icon: 'clear filters' ,
            onClick: handleOnCleanFilters,
            tooltip: 'Clear filters'
        },
        {
            icon: 'refresh',
            onClick: refresh,
            tooltip: 'Refresh data'
        }
    ];

    const disabled = fetcher.awaiting.getRequests || fetcher.awaiting.getRequestFilters;

    return (
        <div className={style.RequestList}>
            {(props.header || props.headerProps) &&
                <Header text={props.header} {...props.headerProps}>
                    <IconNavbar buttons={buttons}/>
                </Header>
            }
            <div className={style.inputsContainer}>
                {props.filters.includes('search') &&
                    <TextInput 
                        className={style.textInput} 
                        input={search} 
                        placeholder='Search for a requester (name, email, Cargill ID)'
                        cleanButton
                        confirmButton='search'
                        disabled={disabled}
                    />
                }
                {props.filters.includes('date') &&
                    <DateTimeRangeInput 
                        input={period}
                        disabled={disabled}
                    />
                }
                {props.filters.includes('status') &&
                    <Select 
                        className={style.select} 
                        input={status} 
                        options={filterOptions.status} 
                        disabled={disabled}
                    />
                }
                {props.filters.includes('type') &&
                    <Select 
                        className={style.select}
                        input={type}
                        options={filterOptions.type}
                        disabled={disabled}
                    />
                }
            </div>
            <List 
                className={style.list} 
                noDataMessage='No request was found' 
                loading={fetcher.awaiting.getRequests}
                onReachBottom={requests.getNext}
            >
                {requestItems}
            </List>
            <InfoDrawer
                header={{
                    text: 'Request Details'
                }}
                elementKey={currentRequest && currentRequest._id}
                onClose={handleOnCloseRequest}
            >
                {currentRequest &&
                    <Request 
                        data={currentRequest} 
                        onRespond={handleOnRespond}
                    />
                }
            </InfoDrawer>
        </div>
    );
}

RequestList.defaultProps = {
    query: {},
    filters: ['search', 'date', 'status', 'type'],
    headerProps: {}
}

export default RequestList;