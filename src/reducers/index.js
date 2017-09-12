import { combineReducers } from 'redux'
import app from './app'
import activities from './activities'
import user from './user'
import room from './room'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
  app,
  user,
  room,
  activities,
  router: routerReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer