import React, { useContext, useState } from "react";
import AppContext from "../../../context/appContext/AppContext";
import Search from '../../../inputs/search/Search';
import Button from "../../buttons/button/Button";
import PopBox from "../../popBox/PopBox";
import CheckBox from "../../../inputs/checkBox/CheckBox";
import style from './TableSettings.module.css';

function TableSettings(props) {
    const [showColumnsSettings, setShowColumnsSettings] = useState(false);
    const appCtx = useContext(AppContext);
    const icons = appCtx.icons;

    const handleOnShowColumnsSettings = () => {
        setShowColumnsSettings(curSt => !curSt);
    }

    const handleOnBlur = () => {
        setShowColumnsSettings(false);
    }

    const handleOnChangeColumns = (input) => {
        const hiddenColumns = {};
        input.value.forEach(input => hiddenColumns[input.value] = !input.checked);
        props.setHiddenColumns(hiddenColumns);
    }

    const columnsOptions = props.columnsOrder.map(columnName => ({
        value: columnName,
        label: props.columns[columnName],
        checked: !props.hiddenColumns[columnName]
    }));

    const buttonProps = {
        className: style.button,
        iconClassName: style.icon,
        activeClassName: style.buttonActive,
        iconPosition:'left',
        disableLabel: true,
        tooltip: true
    };

    return (
        <div className={style.TableSettings}>
            <Search className={style.search} onChange={props.setSearch} value={props.search}/>
            <Button
                {...buttonProps}
                icon={icons.filter}
                onClick={props.onShowFilters}
                active={props.showFilters}
            />
            <div style={{position: 'relative'}}>
                <Button
                    id='columns-setting'
                    {...buttonProps}
                    icon={icons.columns}
                    onClick={handleOnShowColumnsSettings}
                />
                <PopBox
                    className={style.popBox}
                    parentId='columns-setting'
                    horizontalAlign='right'
                    show={showColumnsSettings}
                    onBlur={handleOnBlur}
                >
                    <CheckBox
                        optionClassName={style.popBoxOption}
                        options={columnsOptions}
                        onChange={handleOnChangeColumns}
                    />
                </PopBox>
            </div>
            <Button
                {...buttonProps}
                icon={icons.reset}
                onClick={props.onResetSettings}
            >Reset Table Settings</Button>
        </div>
    );
}

export default TableSettings;