import { fetch } from '../api'
import {
  process as processMessage,
  prepare as prepareMessage
} from '../utils/message'
import { getIO } from '../utils/socket'

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
    dispatch({ type: `HANDLE_SOCKET_MESSAGE_${message.type}`, payload: message.payload })
  }
}

export const createUser = (payload) => {
  return async (dispatch, getState) => {
    getIO().emit('USER_ENTER', {
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
    const state = getState()
    dispatch({ type: 'USER_ENTER', payload })
  }
}

export const sendSocketMessage = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SEND_SOCKET_MESSAGE', payload })
    const state = getState()
    const msg = await prepareMessage(payload, state)
    dispatch({ type: `SEND_SOCKET_MESSAGE_${msg.original.type}`, payload: msg.original.payload })
    getIO().emit('PAYLOAD', msg.toSend)
  }
}

