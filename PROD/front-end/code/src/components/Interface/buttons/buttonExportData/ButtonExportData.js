import React, { useContext } from 'react';
import Button from '../button/Button';
import AppContext from '../../../context/appContext/AppContext';
import DataExport from '../../modal/appModals/dataExport/DataExport';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';

function ButtonExportData(props) {
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);

    const handleOnExportData = () => {
        const onExport = async (exportSettings) => {
            const query = {
                query: props.query(),
                settings: {
                    export: exportSettings
                }
            };

            const settings = {
                fileName: `${props.fetcherSettings.fileName} ${new Date().toLocaleDateString()}`,
                awaitingFlag: props.fetcherSettings.awaitingFlag
            };

            const res = await fetcher[props.fetcherSettings.method](query, settings);

            if(res.ok) {
                appCtx.closeModal();
            }
        }

        appCtx.showModal(
            <DataExport
                settings={props.exportSettings}
                onExport={onExport}
            />
        );
    }

    return (
        <Button
            type='icon'
            icon='download'
            tooltip={props.tooltip}
            onClick={handleOnExportData}
            disabled={props.disabled}
            {...props.button}
        />
    );
}

ButtonExportData.defaultProps = {
    button: {}
};

export default ButtonExportData;