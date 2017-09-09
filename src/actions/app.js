import { push as pushPath } from 'react-router-redux'

export const push = (path) => {
  return async dispatch => {
    dispatch(pushPath(path))
  }
}