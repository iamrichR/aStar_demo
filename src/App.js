import React from 'react';
import Controls from './Components/Controls';
import Header from './Components/Header';
import DemoDisplay from './Components/DemoDisplay';
import { SearchContext } from './Components/SearchContext';
import { useState } from 'react';

export default function App() {
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className="container">
            <SearchContext.Provider
                value={{
                    isSearching: isSearching,
                    toggleIsSearching: () => {
                        setIsSearching(!isSearching);
                    },
                }}
            >
                <div id="app-ui">
                    <Header />
                    <Controls />
                </div>
                <DemoDisplay />
            </SearchContext.Provider>
        </div>
    );
}
