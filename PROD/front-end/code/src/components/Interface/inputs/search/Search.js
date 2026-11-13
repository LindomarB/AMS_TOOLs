import React, { useRef } from 'react';
import Button from '../../buttons/button/Button';
import Icon from '../../icons/icon/Icon';
import style from './Search.module.css';

function Search(props) {
    const debouncingTimer = useRef();

    const handleOnChange = (event) => {
        const newValue = event.target.value;
        clearTimeout(debouncingTimer.current);

        debouncingTimer.current = setTimeout(
            () => props.input.setKeyword(newValue)
        , props.debouncingTime);
    }

    const handleOnCleanSearch = () => {
        props.input.setKeyword('');
    }

    return (
        <div className={`${style.Search} ${props.className || ''}`}>
            <div className={style.inputWrapper}>
                <Icon name='search' size={20} weight={300} color='lightgrey'/>
                <input type='text' placeholder={props.placeholder || 'Search for keywords...'} value={props.input.keyword} onChange={handleOnChange}/>
                <Button className={style.cleanButton} type='icon' icon='close' iconSize={18} color='grey' iconWeight={400} disabled={!props.input.keyword} onClick={handleOnCleanSearch}/>
            </div>
        </div>
    );
}

// Search.defaultProps = {
//     debouncingTime: 1000
// }

export default Search;