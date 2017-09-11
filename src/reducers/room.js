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
        members: state.members.map(m => m.username !== action.payload.username)
      }
    case 'USER_ENTER':
      return {
        ...state,
        members: [ ...state.members, action.payload ]
      }
    case 'ADD_USER':
      return {
        ...state,
        members: [ ...state.members, action.payload ]
      }
    default:
      return state
  }
}

export default room