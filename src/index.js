import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap'
// eslint-disable-next-line no-unused-vars
import webCryptoShim from 'webcrypto-shim/webcrypto-shim.js'
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
