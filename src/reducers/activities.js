const initialState = {
  items: [
    // {
    // type: 'message | file | isTyping | usernameChange | slashCommand',
    // data,
    // username,
    // timestamp
    // }
  ]
}

const activities = (state = initialState, action) => {
  switch(action.type) {
    // case 'SEND_SOCKET_MESSAGE':
    // case 'RECEIVE_SOCKET_MESSAGE':
    case 'HANDLE_SOCKET_MESSAGE_SEND_MESSAGE':
      return [ ...state, action.payload ]
    case 'SEND_MESSAGE':
      return [ ...state, action ]
    default:
      return state
  }
}

export default activities