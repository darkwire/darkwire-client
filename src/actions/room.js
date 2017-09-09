import { fetch } from '../api'

export const createRoom = (id) => {
  return async (dispatch) => fetch({
    resourceName: 'handshake',
    method: 'POST',
    body: {
      roomId: id
    }
  }, dispatch, 'handshake')
}
