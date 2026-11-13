import React from 'react';
import style from './Search.module.css';

function Search(props) {
    const handleOnChange = (event) => {
        props.searchHook.setKeyword(event.target.value);
    }

    const handleOnCleanSearch = () => {
        props.searchHook.setKeyword('');
    }

    return (
        <div className={`${style.Search} ${props.className || ''}`}>
            <div className={style.inputWrapper}>
                <span className='material-icons'>search</span>
                <input type='text' placeholder='Search for keywords...' value={props.searchHook.keyword} onChange={handleOnChange}/>
                <button className={`${style.cleanButton} material-icons`} disabled={!props.searchHook.keyword} onClick={handleOnCleanSearch}>close</button>
            </div>
        </div>
    );
}

export default Search;