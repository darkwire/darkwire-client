import { fetch } from '../api'

export const fetchThing = (id) => {
  return async (dispatch) => fetch({
    resourceName: 'activities',
    query: {
      sequenceId: id
    }
  }, dispatch, 'activities')
}
