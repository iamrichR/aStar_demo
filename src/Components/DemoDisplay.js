import React, { useEffect, useState } from 'react';
import AStarDemo from '../AStar/AStarDemo';

export default function DemoDisplay() {
    const [aStar, setAStar] = useState(new AStarDemo());

    useEffect(() => {
        aStar.setup();
    }, []);

    return <div id="canvas-container"></div>;
}
