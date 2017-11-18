import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './root'

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(Root)

if (module.hot) {
  module.hot.accept('./root.js', () => {
    // eslint-disable-next-line global-require
    const rootComponent = require('./root').default
    renderApp(rootComponent)
  })
}
