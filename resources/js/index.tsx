import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { rootStore } from './store';
import '../css/style.css';

const ReduxApp: React.FC = () => {
    return (
        <Provider store={rootStore}>
            <App />
        </Provider>
    );
};

ReactDOM.render(<ReduxApp />, document.getElementById('root'));
