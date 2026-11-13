import React, { useContext, useEffect, useState } from 'react';
import SettingSection from '../../../components/settingSection/SettingSection';
import style from './PatchHistory.module.css';
import TextNavbar from '../../../../../Interface/navigation/textNavbar/TextNavbar';
import Rule from '../../../../../Interface/rule/Rule';
import LoadableContent from '../../../../../Interface/containers/loadableContent/LoadableContent';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import Patch from './patch/Patch';

function PatchHistory(props) {
    const [selectedPatch, setSelectedPatch] = useState(null);
    const [versions, setVersions] = useState([]);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchVersions();
    }, []);

    const fetchVersions = async () => {
        const res = await fetcher.getPatchs({
            settings: {
                sort: {
                    version: -1
                },
                projection: {
                    _id: 0,
                    version: 1
                }
            }
        }, {
            awaitingFlag: 'fetchVersions'
        });

        if(res.ok) {
            setVersions(res.data);

            if(res.data.length) {
                await fetchPatch(res.data[0].version);
            }
        }
    }

    const fetchPatch = async (version) => {
        const res = await fetcher.getPatchs({
            query: {version: version}
        }, {
            awaitingFlag: 'fetchPatch'
        });

        if(res.ok) {
            setSelectedPatch(res.data[0]);
        }
    }

    const versionsMenu = [{
        sectionName: 'Versions',
        items: versions.map(patch => ({
            label: patch.version,
            active: selectedPatch && (patch.version === selectedPatch.version),
            onClick: () => fetchPatch(patch.version)
        }))
    }];

    return (
        <SettingSection title='Patch History' className={style.settingSection} childrenContainerClassName={style.PatchHistory}>
            <LoadableContent loading={!versions.length || fetcher.awaiting.fetchVersions}>
                <TextNavbar className={style.versions} items={versionsMenu} notSort/>
                <Rule vertical/>
                <LoadableContent elementKey={selectedPatch && selectedPatch._id} loading={!selectedPatch || fetcher.awaiting.fetchPatch}>
                    <Patch patch={selectedPatch} />
                </LoadableContent>
            </LoadableContent>
        </SettingSection>
    );
}

export default PatchHistory;