import React from 'react';
import Text from '../../../../../../Interface/Text/Text';
import style from './Patch.module.css';
import Header from '../../../../../../Interface/header/Header';

function Patch(props) {
    const notes = props.patch.notes.map(note => {
        const changes = note.changes.map((change, idx) => {
            if(typeof change === 'string') {
                return (
                    <Text key={`${note.module}-change-${idx}`} color='grey' size={14}>
                        {change}
                    </Text>
                );
            } else {
                switch(change.type) {
                    case 'list':
                        const items = change.list.map((change, idx) => (
                            <Text key={`${note.module}-change-${idx}`} li color='grey' size={14}>
                                {change}
                            </Text>
                        ));
    
                        return (
                            <ul key={`${note.module}-change-${idx}`} className={style.changes}>
                                {items}
                            </ul>
                        );
                    default:
                        return null;
                }
            }
        });

        return (
            <div key={note.module} className={style.module}>
                <Header 
                    text={note.module} 
                    icon={note.module.toLowerCase()}
                    textProps={{
                        size: 16,
                        weight: 400
                    }}
                    color='icon'
                />
                {changes}
            </div>
        )
    });

    return (
        <div className={style.Patch}>
            <div className={style.header}>
                <Text size={18}>
                    Patch {props.patch.version}
                </Text>
                <Text color='grey' size={12}>
                    {new Date(props.patch.date).toLocaleDateString()}
                </Text>
            </div>
            {/* {props.patch.notes.map(note => (
                <div key={note.module} className={style.module}>
                    <Text size={16}>
                        {note.module}
                    </Text>
                    <ul className={style.changes}>
                        {note.changes.map((change, idx) => (
                            <Text key={`${note.module}-change-${idx}`} li={change.startsWith('-')} color='grey' size={14}>
                                {change.startsWith('-')? change.replace('-', '') : change}
                            </Text>
                        ))}
                    </ul>
                </div>
            ))} */}
            {notes}
        </div>
    );
}

export default Patch;