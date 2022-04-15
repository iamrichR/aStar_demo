import React from 'react';
import Controls from './Components/Controls';
import Header from './Components/Header';
import DemoDisplay from './Components/DemoDisplay';
import { SearchContext } from './Components/SearchContext';
import { useState } from 'react';
import { MouseClickContext } from './Components/MouseClickContext';
import { placing } from './Components/MouseClickContext';

export default function App() {
    const [isSearching, setIsSearching] = useState(false);
    const [stepCount, setStepCount] = useState(0);
    const [currentlyPlacing, setCurrentlyPlacing] = useState(placing.start);

    return (
        <div className="container">
            <SearchContext.Provider
                value={{
                    isSearching: isSearching,
                    toggleIsSearching: () => {
                        setIsSearching(!isSearching);
                    },
                    stepCount: stepCount,
                    setStepCount: setStepCount,
                }}
            >
                <MouseClickContext.Provider
                    value={{
                        currentlyPlacing: currentlyPlacing,
                        setCurrentlyPlacing: setCurrentlyPlacing,
                    }}
                >
                    <div id="app-ui">
                        <Header />
                        <Controls />
                    </div>
                    <DemoDisplay />
                </MouseClickContext.Provider>
            </SearchContext.Provider>
        </div>
    );
}
