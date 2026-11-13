import React, { useContext } from "react";
import AppContext from "../../../context/appContext/AppContext";
import Filter from "../../../inputs/filter/Filter";
import Button from "../../buttons/button/Button";
import SlidingPanel from "../../slidingPanel/SlidingPanel";
import style from "./FilterPanel.module.css";

function FilterPanel(props) {
    const appCtx = useContext(AppContext);
    const icons = appCtx.icons;

    const handleOnChangeFilter = (filter) => {
        props.onChangeFilter(filter);
    }

    const filters = props.filterOptions.map(filterOption => {
        const selectedOptions = props.filterState[filterOption.name]
            ? props.filterState[filterOption.name].selectedOptions 
            : [];

        return (
            <Filter 
                key={filterOption.name} 
                className={style.filter}
                name={filterOption.name} 
                label={filterOption.label} 
                options={filterOption.options}
                selectedOptions={selectedOptions} 
                onSelectOption={handleOnChangeFilter}
            />
        );
    });

    const cleanButtonDisabled = !Object.keys(props.filterState).length;

    return (
        <SlidingPanel className={props.className} open={props.open}>
            <div className={style.header}>
                <h3>Filters</h3>
                <button className={`${style.closeButton} material-icons`} onClick={props.onClose}>close</button>
            </div>
            <Button
                className={style.cleanButton}
                activeClassName={style.cleanButtonActive}
                icon={icons.cleanFilter}
                activeIcon={{...icons.cleanFilter, type: ''}}
                iconPosition="left"
                onClick={props.onCleanFilters}
                disabled={cleanButtonDisabled}
            />
            <div className={style.FilterPanel}>
                {filters}
            </div>
        </SlidingPanel>
    );
}

export default FilterPanel;