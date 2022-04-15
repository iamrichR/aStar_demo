import React, { useEffect, useState, useContext } from 'react';
import AStarDemo from '../AStar/AStarDemo';
import { SearchContext } from './SearchContext';
import { MouseClickContext } from './MouseClickContext';

export default function DemoDisplay() {
    const [aStar, setAStar] = useState(new AStarDemo());
    const search = useContext(SearchContext);
    const placingState = useContext(MouseClickContext);

    useEffect(() => {
        aStar.setup();
    }, []);

    useEffect(() => {
        if (search.isSearching) {
            console.log('using effect...');
            aStar.beginSearch();
        }
    }, [search.isSearching]);

    useEffect(() => {
        aStar.nextSearchStep();
    }, [search.stepCount]);

    useEffect(() => {
        aStar.changePlacingState(placingState.currentlyPlacing);
    }, [placingState.currentlyPlacing]);

    return <div id="canvas-container" className="is-flex flex-center"></div>;
}
