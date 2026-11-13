import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import modules from '../../../data/app/modules';
import LoadableContent from '../../Interface/containers/loadableContent/LoadableContent';
import FetcherContext from '../../context/fetcherContext/FetcherContext';
import CurrentPatch from './currentPatch.js/CurrentPatch';
import Page from '../../Interface/page/Page';
import TextNavbar from '../../Interface/navigation/textNavbar/TextNavbar';
import Patch from './patch/Patch';
import style from './About.module.css';

function About(props) {
    const [patchVersions, setPatchVersions] = useState([]);
    const fetcher = useContext(FetcherContext);
    const location = useLocation();
    const navigate = useNavigate();

    const about = modules('support', 'release notes');

    useEffect(() => {
        if(location.pathname === about.path) {
            navigate(about.getRoute('version').path);
        };
    }, [location]);

    useEffect(() => {
        fetchPatchVersions();
    }, []);

    const fetchPatchVersions = async () => {
        const res = await fetcher.getPatchs({
            settings: {
                projection: {
                    version: 1
                },
                sort: {
                    date: -1
                }
            }
        }, {
            awaitingFlag: 'getPatchVersions'
        });

        if(res.ok) {
            setPatchVersions(res.data);
        }
    }

    const menu = [
        {
            label: about.getRoute('version').label.en,
            path: about.getRoute('version').path
        },
        {
            sectionName: about.getRoute('patch history').label.en,
            items: patchVersions.map(patch => ({
                label: patch.version,
                path: `patch history/${patch.version}`
            }))
        }
    ];

    return (
        <LoadableContent loading={!patchVersions.length || fetcher.awaiting.getPatchVersions}>
            <Page
                doubleContainer
                leftContainer={{
                    className: style.leftContainer
                }}
                rightContainer={{
                    className: style.rightContainer
                }}
            >
                <TextNavbar items={menu} notSort/>
                <Routes>
                    <Route 
                        path='version'
                        element={<CurrentPatch />}
                    />
                    <Route 
                        path='patch history/:version'
                        element={<Patch />}
                    >
                    </Route>
                </Routes>
            </Page>
        </LoadableContent>
    );
}

export default About;