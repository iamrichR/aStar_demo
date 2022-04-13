import React, { useEffect, useState, useContext } from 'react';
import AStarDemo from '../AStar/AStarDemo';
import { SearchContext } from './SearchContext';

export default function DemoDisplay() {
    const [aStar, setAStar] = useState(new AStarDemo());
    const search = useContext(SearchContext);

    useEffect(() => {
        aStar.setup();
    }, []);

    useEffect(() => {
        if (search.isSearching) {
            console.log('using effect...');
            aStar.beginSearch;
        }
    }, [search.isSearching]);

    return <div id="canvas-container" className="is-flex flex-center"></div>;
}
