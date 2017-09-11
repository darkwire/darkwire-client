const initialState = {
  members: [
    // {
    //   username,
    //   publicKey,
    //   privateKey
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
        members: state.members.filter(m => m.publicKey !== action.payload.publicKey)
      }
    case 'USER_ENTER':
      return {
        ...state,
        members: [ ...state.members, action.payload ]
      }
    default:
      return state
  }
}

export default room