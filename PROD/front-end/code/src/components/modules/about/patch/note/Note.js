import React from 'react';
import Text from '../../../../Interface/Text/Text';
import style from './Note.module.css';
import Header from '../../../../Interface/header/Header';

function Change(props) {
    if(typeof props.change === 'string') {
        return (
            <Text color='grey' size={14}>
                {props.change}
            </Text>
        );
    } else {
        switch(props.change.type) {
            case 'list':
                const items = props.change.list.map((change, idx) => (
                    <Text key={`${props.module}-change-${idx}`} li color='grey' size={14}>
                        {change}
                    </Text>
                ));

                return (
                    <ul className={style.changes}>
                        {items}
                    </ul>
                );
            default:
                return null;
        }
    }
}

function Note(props) {
    const changes = props.changes && (
        <div className={style.container}>
            {props.changes.map((change, idx) => 
                <Change key={`${props.module}-change-${idx}`} change={change} module={props.module}/>
            )}
        </div>
    );

    const submodules = props.submodules.map(submodule => (
        <div key={`${submodule.name}-changes`} className={style.container}>
            <Text className={style.submodule} color='grey' weight={600}>{submodule.name}</Text>
            {submodule.changes.map((change, idx) => 
                <Change key={`${submodule.name}-change-${idx}`} change={change} module={props.module}/>
            )}
        </div>
    ));

    return (
        <div className={style.Note}>
            <Header
                text={props.module} 
                icon={props.module.toLowerCase()}
                textProps={{
                    size: 16,
                    weight: 500
                }}
                color='icon'
            />
            {changes}
            {submodules}
        </div>
    );
}

Note.defaultProps = {
    submodules: []
};

export default Note;