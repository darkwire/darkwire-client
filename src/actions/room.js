import fetch from 'api'
import isEqual from 'lodash/isEqual'
import {
  process as processMessage,
  prepare as prepareMessage,
} from 'utils/message'
import { getIO } from 'utils/socket'

export const createRoom = id => async dispatch => fetch({
  resourceName: 'handshake',
  method: 'POST',
  body: {
    roomId: id,
  },
}, dispatch, 'handshake')

export const receiveSocketMessage = payload => async (dispatch, getState) => {
  dispatch({ type: 'RECEIVE_SOCKET_MESSAGE', payload })
  const state = getState()
  const message = await processMessage(payload, state)
  dispatch({ type: `HANDLE_SOCKET_MESSAGE_${message.type}`, payload: { payload: message.payload, state } })
}

export const createUser = payload => async (dispatch) => {
  getIO().emit('USER_ENTER', {
    publicKey: payload.publicKey,
  })
  dispatch({ type: 'CREATE_USER', payload })
}

export const receiveUserExit = payload => async (dispatch, getState) => {
  const state = getState()
  const exitingUsername = state.room.members.find(m => isEqual(m.publicKey, payload.publicKey)).username

  dispatch({
    type: 'USER_EXIT',
    payload: {
      ...payload,
      username: exitingUsername,
    },
  })
}

export const receiveUserEnter = payload => async (dispatch) => {
  dispatch({ type: 'USER_ENTER', payload })
}

export const sendSocketMessage = payload => async (dispatch, getState) => {
  dispatch({ type: 'SEND_SOCKET_MESSAGE', payload })
  const state = getState()
  const msg = await prepareMessage(payload, state)
  dispatch({ type: `SEND_SOCKET_MESSAGE_${msg.original.type}`, payload: msg.original.payload })
  getIO().emit('PAYLOAD', msg.toSend)
}

export const toggleLockRoom = () => async (dispatch, getState) => {
  const state = getState()
  getIO().emit('TOGGLE_LOCK_ROOM')
  dispatch({
    type: 'TOGGLE_LOCK_ROOM',
    payload: {
      locked: !state.room.isLocked,
      username: state.user.username,
    },
  })
}

export const receiveToggleLockRoom = payload => async (dispatch, getState) => {
  const state = getState()

  const lockedByUsername = state.room.members.find(m => isEqual(m.publicKey, payload.publicKey)).username

  dispatch({
    type: 'RECEIVE_TOGGLE_LOCK_ROOM',
    payload: {
      username: lockedByUsername,
      locked: payload.locked,
    },
  })
}

export const triggerCommand = payload => async (dispatch, getState) => {
  const state = getState()
  const { user } = state

  dispatch({
    type: 'SLASH_COMMAND',
    payload: {
      ...payload,
      username: user.username,
    },
  })
}
