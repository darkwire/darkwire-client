import _ from 'lodash'

const initialState = {
  members: [
    // {
    //   username,
    //   publicKey
    // }
  ],
  id: '',
  isLocked: false
}

const room = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_CREATE_HANDSHAKE_SUCCESS':
      return {
        ...state,
        id: action.payload.json.id,
        isLocked: action.payload.json.isLocked
      }
    case 'USER_EXIT':
      return {
        ...state,
        members: state.members.filter(m => !_.isEqual(m.publicKey, action.payload.publicKey))
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      const pubKeys = _.uniqWith(state.members.map(m => m.publicKey).concat(action.payload.payload.publicKey), _.isEqual)
      return {
        ...state,
        members: pubKeys.map(pubKey => {
          const exists = state.members.find(m => _.isEqual(m.publicKey, pubKey))
          if (exists && exists.username) {
            return {
              username: exists.username,
              publicKey: exists.publicKey
            }
          }
          return {
            publicKey: action.payload.payload.publicKey,
            username: action.payload.payload.username
          }
        })
      }
    case 'CREATE_USER':
      return {
        ...state,
        members: [
          ...state.members,
          {
            username: action.payload.username,
            publicKey: action.payload.publicKey
          }
        ]
      }
    case 'USER_ENTER':
      return {
        ...state,
        members: action.payload.map(pubKey => {
          const exists = state.members.find(m => _.isEqual(m.publicKey, pubKey))
          if (exists) {
            return exists
          }
          return {
            publicKey: pubKey
          }
        })
      }
    case 'TOGGLE_LOCK_ROOM':
      return {
        ...state,
        isLocked: !state.isLocked
      }
    case 'RECEIVE_TOGGLE_LOCK_ROOM':
      return {
        ...state,
        isLocked: action.payload.locked
      }
    default:
      return state
  }
}

export default room