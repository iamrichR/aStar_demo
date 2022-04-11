import React from 'react';

export default function SearchControls() {
    return (
        <div id="search-controls">
            <div className="columns">
                <div className="column">
                    <button id="skip-btn" className="button">
                        Skip to End
                    </button>
                </div>
                <div className="column">
                    <button id="next-btn" className="button">
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    );
}
