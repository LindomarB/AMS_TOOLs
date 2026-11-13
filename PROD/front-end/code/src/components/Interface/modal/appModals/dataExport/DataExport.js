import React, { useContext } from 'react';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import useInput from '../../../../hooks/useInput';
import Button from '../../../buttons/button/Button';
import CheckBox from '../../../inputs/checkBox/CheckBox';
import Modal from '../../Modal';
import style from './DataExport.module.css';
import sortByField from '../../../../../functions/array/sortByField';

function DataExport(props) {
    const fetcher = useContext(FetcherContext);

    const fields = useInput({
        name: 'fields', 
        required: true,
        initialValue: props.settings.reduce((values, setting) => {
            if(setting.default) values.push(setting.field);
            return values;
        }, [])
    });

    const handleOnExport = () => {
        props.onExport(props.settings.filter(setting => fields.value.includes(setting.field)))
    }

    const fieldOptions = props.settings.map(setting => ({
        value: setting.field,
        label: setting.as
    }));

    sortByField(fieldOptions, 'label');

    return (
        <Modal
            title='Data export'
            titleIcon={{name: 'download'}}
            onClose={props.onClose}
        >
            {/* <Text>Select the fields you want to export</Text> */}
            <CheckBox 
                className={style.checkBox}
                labelClassName={style.label}
                input={fields}
                label='Select the fields you want to export'
                options={fieldOptions}
            />
            <Button
                icon='download'
                onClick={handleOnExport}
                awaiting={fetcher.awaiting[props.settings.awaitingFlag]}
            >Export</Button>
        </Modal>
    );
}

export default DataExport;