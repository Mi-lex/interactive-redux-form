import React from 'react';
import icons from '../assets/icons';
import 'svgxuse';

const App: React.FC = () => {
    return (
        <>
            <h1>I did it, right</h1>
            <svg>
                <use xlinkHref={icons.css3}></use>
            </svg>
        </>
    );
};

export default App;
