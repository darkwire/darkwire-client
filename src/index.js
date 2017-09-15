import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import Root from './root'
import reducers from 'reducers'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import env from 'config/env'

const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
)

const renderFunc = (Component) => {
  render(
    <Provider store={store}>
      <Root component={Component} />
    </Provider>,
    document.getElementById('root')
  )
}

renderFunc(Root)

if (module.hot) {
  module.hot.accept('./root.js', () => {
    renderFunc(Root)
  });
}
