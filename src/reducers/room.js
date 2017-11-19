import _ from 'lodash'

const initialState = {
  members: [
    // {
    //   username,
    //   publicKey
    // }
  ],
  id: '',
  isLocked: false,
  joining: true,
  size: 0,
}

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CREATE_HANDSHAKE_SUCCESS':
      const isLocked = action.payload.json.isLocked
      // Handle "room is locked" message for new members here
      return {
        ...state,
        id: action.payload.json.id,
        isLocked,
        size: action.payload.json.size,
        joining: action.payload.json.size === 1 ? false : true,
      }
    case 'USER_EXIT':
      return {
        ...state,
        members: state.members.filter(m => !_.isEqual(m.publicKey, action.payload.publicKey)),
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      const pubKeys = _.uniqWith(state.members.map(m => m.publicKey).concat(action.payload.payload.publicKey), _.isEqual)
      
      const joining = state.joining ? state.members.length !== state.size : false

      return {
        ...state,
        members: pubKeys.map((pubKey) => {
          const exists = state.members.find(m => _.isEqual(m.publicKey, pubKey))
          if (exists && exists.username) {
            return {
              username: exists.username,
              publicKey: exists.publicKey,
            }
          }
          return {
            publicKey: action.payload.payload.publicKey,
            username: action.payload.payload.username,
          }
        }),
        joining,
      }
    case 'CREATE_USER':
      return {
        ...state,
        members: [
          ...state.members,
          {
            username: action.payload.username,
            publicKey: action.payload.publicKey,
          },
        ],
      }
    case 'USER_ENTER':
      return {
        ...state,
        members: action.payload.map((pubKey) => {
          const exists = state.members.find(m => _.isEqual(m.publicKey, pubKey))
          if (exists) {
            return exists
          }
          return {
            publicKey: pubKey,
          }
        }),
      }
    case 'TOGGLE_LOCK_ROOM':
      return {
        ...state,
        isLocked: !state.isLocked,
      }
    case 'RECEIVE_TOGGLE_LOCK_ROOM':
      return {
        ...state,
        isLocked: action.payload.locked,
      }
    default:
      return state
  }
}

export default room
