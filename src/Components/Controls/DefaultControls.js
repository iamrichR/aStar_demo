import React from 'react';

export default function DefaultControls() {
    return (
        <div id="default-controls">
            <div className="control columns">
                <label className="btn-column column">
                    <input
                        id="place-start-radio"
                        type="radio"
                        name="placement-selection"
                    ></input>
                    &nbsp;Place Start Point
                </label>
                <label className="btn-column column">
                    <input
                        id="place-end-radio"
                        type="radio"
                        name="placement-selection"
                    ></input>
                    &nbsp;Place End Point
                </label>
                <label className="btn-column column">
                    <input
                        id="place-walls-radio"
                        type="radio"
                        name="placement-selection"
                    ></input>
                    &nbsp;Place Walls
                </label>
            </div>
            <div className="columns">
                <div className="btn-column column">
                    <button id="start-btn" className="button">
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