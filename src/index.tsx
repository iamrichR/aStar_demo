import React from "react";
import ReactDOM from "react-dom";
import AStarDemo from "./AStarDemo";

const App = () =>{
    return(
        <div id="app">
            <h1>A* Demo App</h1>
            <small>(work in progress)</small>
            <div>
                <button id="start-btn">Start Search</button>
                <button id="next-btn">Next Search Step</button>
            </div>
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const aStar = new AStarDemo();
    aStar.setup();
});

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
