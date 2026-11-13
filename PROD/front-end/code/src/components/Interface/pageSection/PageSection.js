import React from 'react';
import Banner from '../banner/Banner';
import SectionHeader from '../sectionHeader/SectionHeader';
import style from './PageSection.module.css';

function PageSection(props) {
    const {banner, header} = props;

    const sectionHeader = header
        ? <SectionHeader {...header}/>
        : null;

    const content = props.type === 'menu'
        ? (
            <div className={style.menuContainer}>
                {props.children}
            </div>
        )
        : props.children;

    if(banner) {
        return (
            <div className={`${style.PageSection} ${style.withBanner} ${props.className || ''}`}>
                <Banner 
                    {...banner}
                    className={`${style.banner} ${banner.className}`}
                />
                <div className={style.childrenWrapper}>
                    {sectionHeader}
                    {content}
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${style.PageSection} ${props.className || ''}`}>
                {sectionHeader}
                {content}
            </div>
        );
    }

}

export default PageSection;