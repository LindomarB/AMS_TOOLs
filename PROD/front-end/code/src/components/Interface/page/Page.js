import React from 'react';
import style from './Page.module.css';

function Page(props) {
    if(props.doubleContainer) {
        const isFragment = !Array.isArray(props.children) && props.children.type === React.Fragment;

        return (
            <div className={`${style.Page} ${style.doubleContainer} ${props.className || ''}`}>
                <div {...props.leftContainer} className={`${style.leftContainer} ${props.leftContainer.className || ''}`}>
                    {isFragment
                        ? props.children.props.children[0]
                        : props.children[0]
                    }
                </div>
                <div {...props.rightContainer} className={`${style.rightContainer} ${props.rightContainer.className || ''}`}>
                {isFragment
                        ? props.children.props.children[1]
                        : props.children[1]
                    }
                </div>
            </div>
        );
    }

    return (
        <div className={`${style.Page} ${props.className || ''}`}>
            {props.children}
        </div>
    );
}

Page.defaultProps = {
    leftContainer: {},
    rightContainer: {}
};

export default Page;