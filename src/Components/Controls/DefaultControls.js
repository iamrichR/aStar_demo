import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../SearchContext';
import { MouseClickContext, placing } from '../MouseClickContext';

export default function DefaultControls() {
    function handleChange(event) {
        if (placingState.currentlyPlacing != event.target.value) {
            placingState.setCurrentlyPlacing(event.target.value);
        }
    }

    const search = useContext(SearchContext);
    const placingState = useContext(MouseClickContext);

    return (
        <div id="default-controls">
            <div className="control columns">
                <label className="btn-column column">
                    <input
                        id="place-start-radio"
                        type="radio"
                        value={placing.start}
                        name="placement-selection"
                        checked={
                            placingState.currentlyPlacing === placing.start
                        }
                        onChange={handleChange}
                    ></input>
                    &nbsp;Place Start Point
                </label>
                <label className="btn-column column">
                    <input
                        id="place-end-radio"
                        type="radio"
                        value={placing.end}
                        name="placement-selection"
                        checked={placingState.currentlyPlacing === placing.end}
                        onChange={handleChange}
                    ></input>
                    &nbsp;Place End Point
                </label>
                <label className="btn-column column">
                    <input
                        id="place-walls-radio"
                        type="radio"
                        value={placing.wall}
                        name="placement-selection"
                        checked={placingState.currentlyPlacing === placing.wall}
                        onChange={handleChange}
                    ></input>
                    &nbsp;Place Walls
                </label>
            </div>
            <div className="columns">
                <div className="btn-column column">
                    <button
                        id="start-btn"
                        className="button"
                        onClick={search.toggleIsSearching}
                    >
                        Begin Search
                    </button>
                </div>
                <div className="btn-column column">
                    <label className="checkbox">
                        <input id="animation-checkbox" type="checkbox"></input>
                        &nbsp;Animate Results?
                    </label>
                </div>
            </div>
        </div>
    );
}
