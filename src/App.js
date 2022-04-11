import React from 'react';
import Controls from './Components/Controls';
import Header from './Components/Header';
import DemoDisplay from './Components/DemoDisplay';
import { SearchContext } from './Components/SearchContext';

export default function App() {
    return (
        <div className="container">
            <SearchContext.Provider value={{ isSearching: true }}>
                <div id="app-ui">
                    <Header />
                    <Controls />
                </div>
                <DemoDisplay />
            </SearchContext.Provider>
        </div>
    );
}
