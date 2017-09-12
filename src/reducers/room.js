import _ from 'lodash'

const initialState = {
  members: [
    // {
    //   username,
    //   publicKey
    // }
  ],
  id: null
}

const room = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_CREATE_HANDSHAKE_SUCCESS':
      return {
        ...state,
        id: action.payload.json.id
      }
    case 'USER_EXIT':
      return {
        ...state,
        members: state.members.filter(m => JSON.stringify(m.publicKey) !== JSON.stringify(action.payload.publicKey))
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      const pubKeys = _.uniq(state.members.map(m => m.publicKey).concat(action.payload.publicKey))
      return {
        ...state,
        members: pubKeys.map(pubKey => {
          const exists = state.members.find(m => m.publicKey === pubKey)
          if (exists) {
            return exists
          }
          return {
            publicKey: pubKey,
            username: action.payload.username
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
    default:
      return state
  }
}

export default room