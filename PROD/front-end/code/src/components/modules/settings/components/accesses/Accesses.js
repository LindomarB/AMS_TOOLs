import React, { useEffect, useRef, useState } from "react";
import LoadableContent from "../../../../Interface/containers/loadableContent/LoadableContent";
import RefreshButton from "../refreshButton/RefreshButton";
import Tabs from "../../../../Interface/navigation/tabs/Tabs";

function Accesses(props) {
    const [currentTab, setCurrentTab] = useState();
    const [loading, setLoading] = useState(true);
    const onRefresh = useRef();

    useEffect(() => {
        props.refreshUser()
        .then(() => setLoading(false));
    }, []);

    const setOnRefreshData = (func) => {
        onRefresh.current = func;
    }

    const onRefreshData = async () => {
        props.refreshUser && await props.refreshUser();
        props.onRefreshData && await props.onRefreshData();
        onRefresh.current && await onRefresh.current();
    }

    const onChangeTab = (tab) => {
        setCurrentTab(tab);
        onRefresh.current = null;
    }
    
    const tab = props.tabs.find(tab => tab.text === currentTab);

    const element = (tab && tab.element) && (
        <tab.element.type 
            {...tab.element.props}
            onRefreshData={setOnRefreshData}
        />
    );

    return (
        <LoadableContent loading={loading}>
            <RefreshButton onRefresh={onRefreshData}/>
            <Tabs
                style={{marginBottom: '2rem'}}
                tabs={props.tabs} 
                selectedTab={currentTab}
                onClick={onChangeTab}
                track
            />
            {element}
        </LoadableContent>
    );
}

export default Accesses;