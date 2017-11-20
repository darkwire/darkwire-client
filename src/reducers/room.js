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
        joining: !(action.payload.json.size === 1),
      }
    case 'USER_EXIT':
      const memberPubKeys = action.payload.members.map(m => JSON.stringify(m.publicKey))
      return {
        ...state,
        members: state.members
          .filter(m => memberPubKeys.includes(JSON.stringify(m.publicKey)))
          .map(m => {
            const payloadMember = action.payload.members.find(member => _.isEqual(m.publicKey, member.publicKey))
            return {
              ...m,
              ...payloadMember,
            }
          })
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      const pubKeys = _.uniqWith(state.members.map(m => m.publicKey).concat(action.payload.payload.publicKey), _.isEqual)
      const joining = state.joining ? state.members.length < state.size : false

      return {
        ...state,
        members: state.members.map(member => {
          if (_.isEqual(member.publicKey, action.payload.payload.publicKey)) {
            return {
              ...member,
              username: action.payload.payload.username,
              isOwner: action.payload.payload.isOwner,
            }
          }
          return member
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
        members: action.payload.map((user) => {
          const exists = state.members.find(m => _.isEqual(m.publicKey, user.publicKey))
          if (exists) {
            return {
              ...user,
              ...exists,
            }
          }
          return {
            publicKey: user.publicKey,
            isOwner: user.isOwner,
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
