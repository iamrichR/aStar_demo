import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Controls from './Components/Controls';
import Header from './Components/Header';
import DemoDisplay from './Components/DemoDisplay';
import './scss/styles.scss';

const App = () => {
    return (
        <div className="container">
            <div id="app">
                <Header />
                <Controls />
            </div>
            <DemoDisplay />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(<App />);
