import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import App from './containers/App'
import '../css/style.css'

const store = configureStore()

const ReduxApp: React.FC = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<ReduxApp />, document.getElementById('root'))
