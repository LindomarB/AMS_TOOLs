import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Text from '../../../Interface/Text/Text';
import Header from '../../../Interface/header/Header';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import LoadableContent from '../../../Interface/containers/loadableContent/LoadableContent';
import Note from './note/Note';
import style from './Patch.module.css';

function Patch(props) {
    const [patchData, setPatchData] = useState(props.patch);
    const fetcher = useContext(FetcherContext);
    const params = useParams();

    useEffect(() => {
        if(!props.patch) {
            fetchPatch();
        }
    }, [params.version, props.version]);

    const fetchPatch = async () => {
        const res = await fetcher.getPatchs({
            query: {
                version: props.version || params.version
            },
            settings: {
                sort: {
                    date: -1
                },
                limit: 1
            }
        }, {
            awaitingFlag: 'getPatch'
        });

        if(res.ok) {
            setPatchData(res.data[0]);
        }
    }

    const notes = patchData && patchData.notes.map(note => <Note key={note.module} {...note}/>);

    return (
        <LoadableContent loading={!patchData || fetcher.awaiting.getPatch}>
            <div className={style.Patch}>
                <Header 
                    textClassName={style.header}
                    text={
                        <>
                            Patch {patchData && patchData.version}
                            <Text span color='grey' size={12}>
                                {new Date(patchData && patchData.date).toLocaleDateString()}
                            </Text>
                        </>
                    }
                    rule
                    {...props.headerProps || {}}
                />
                {notes}
            </div>
        </LoadableContent>
    );
}

export default Patch;