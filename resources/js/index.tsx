import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { rootStore } from './store/index'
import App from './containers/App'
import '../css/style.css'

const ReduxApp: React.FC = () => {
    return (
        <Provider store={rootStore}>
            <App />
        </Provider>
    )
}

ReactDOM.render(<ReduxApp />, document.getElementById('root'))
