import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducers from './reducers'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import env from './config/env'

const history = createHistory()

history.listen(function (location) {
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)

const renderFunc = (Component) => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <AppContainer>
            <Route path="/" component={Component}/>
          </AppContainer>
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

renderFunc(App)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderFunc(App)
  });
}