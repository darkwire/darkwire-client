import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'
import Root from './root'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

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
    const rootComponent = require('./root').default
    renderFunc(rootComponent)
  })
}
