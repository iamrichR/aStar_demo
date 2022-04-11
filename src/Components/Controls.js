import React, { useContext } from 'react';
import DefaultControls from './Controls/DefaultControls';
import SearchControls from './Controls/SearchControls';
import { SearchContext } from './SearchContext';

export default function Controls() {
    const search = useContext(SearchContext);

    const getContextualControls = function () {
        if (search.isSearching) {
            return <SearchControls />;
        } else {
            return <DefaultControls />;
        }
    };

    return (
        <section id="controls" className="section is-small is-flex flex-center">
            {getContextualControls()}
            {/* <button id="start-btn" className="button">
                Start Search
            </button>
            <button id="next-btn" className="button">
                Next Step
            </button> */}
        </section>
    );
}
