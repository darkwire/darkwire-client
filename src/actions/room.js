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
    // Process message
    const state = getState()
    const message = await processMessage(payload, state)
    // Dispatch message type action
    dispatch({ type: message.type, payload: message.payload })
  }
}

export const userEnter = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'RECEIVE_SOCKET_MESSAGE', payload })
    // Process message
    const state = getState()
    // const message = await processUserEnterMessage(payload, state)
    // Dispatch message type action
    dispatch({ type: 'USER_ENTER', payload })
  }
}

export const userExit = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'RECEIVE_SOCKET_MESSAGE', payload })
    // Process message
    const state = getState()
    // const message = await processUserExitMessage(payload, state)
    // Dispatch message type action
    dispatch({ type: 'USER_EXIT', payload })
  }
}

export const sendSocketMessage = (io, payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SEND_SOCKET_MESSAGE', payload })

    // Dispatch message type action
    // dispatch({ type: payload.type, payload: payload.payload })

    try {
      // Prep for sending (encrypt payload)
      const state = getState()
      const msg = await prepareMessage(payload, state)
      console.log('EMIT')
      console.log(msg)
      io.emit('PAYLOAD', msg)
    } catch(e) {
      console.log(e)
    }
  }
}

export const createUser = (user) => {
  return { type: 'CREATE_USER', payload: user }
}
