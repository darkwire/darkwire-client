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
      return {
        ...state,
        members: state.members.map(m => {
          return JSON.stringify(m.publicKey) === JSON.stringify(action.payload.publicKey) ? {
            ...m,
            username: action.payload.username
          } : m
        })
        // members: [
        //   ...state.members,
        //   {
        //     username: action.payload.username,
        //     publicKey: action.payload.publicKey
        //   }
        // ]
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
        members: [
          ...state.members,
          {
            publicKey: action.payload.publicKey
          }
        ]
      }
    default:
      return state
  }
}

export default room