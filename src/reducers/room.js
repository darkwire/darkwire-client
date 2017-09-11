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
      console.log(action.payload.publicKey)
      return {
        ...state,
        members: state.members.filter(m => m.publicKey !== action.payload.publicKey)
      }
    case 'USER_ENTER':
      // When I receive someone else's public key and username
      return {
        ...state,
        members: [ ...state.members, action.payload ]
      }
    // case 'CREATE_USER':
    //   // When I create my key and username
    //   return {
    //     ...state,
    //     members: [ ...state.members, action.payload ]
    //   }
    default:
      return state
  }
}

export default room