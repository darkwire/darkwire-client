import { createStore, applyMiddleware, compose } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'

const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const enabledMiddlewares = [thunk]

const middlewares = applyMiddleware(...enabledMiddlewares)

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    composeEnhancers(middlewares),
  )
}
