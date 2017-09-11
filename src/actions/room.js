import { fetch } from '../api'
import {
  process as processMessage,
  prepare as prepareMessage
} from '../utils/message'

export const createRoom = (id) => {
  return async (dispatch) => fetch({
    resourceName: 'handshake',
    method: 'POST',
    body: {
      roomId: id
    }
  }, dispatch, 'handshake')
}

export const receiveSocketMessage = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'RECEIVE_SOCKET_MESSAGE', payload })
    const state = getState()
    const message = await processMessage(payload, state)
    dispatch({ type: message.type, payload: message.payload })
  }
}

export const createUser = (io, payload) => {
  return async (dispatch, getState) => {
    io.emit('USER_ENTER', {
      username: payload.username,
      publicKey: payload.publicKey
    })
    dispatch({ type: 'CREATE_USER', payload })
  }
}

export const receiveUserExit = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'USER_EXIT', payload })
  }
}

export const receiveUserEnter = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'USER_ENTER', payload })
  }
}

export const sendSocketMessage = (io, payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SEND_SOCKET_MESSAGE', payload })
    try {
      const state = getState()
      const msg = await prepareMessage(payload, state)
      io.emit('PAYLOAD', msg)
    } catch(e) {
    }
  }
}

