import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import App from './containers/App'
import '../css/style.css'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)

serviceWorker.unregister()
