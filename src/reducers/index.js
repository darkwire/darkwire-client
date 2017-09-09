import { combineReducers } from 'redux'
import app from './app'
import entities from './entities'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
  entities,
  router: routerReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer