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
    case 'SEND_MESSAGE':
    case 'HANDLE_SOCKET_MESSAGE_SEND_MESSAGE':
      return {
        ...state,
        items: [ ...state.items, action.payload ]
      }
    default:
      return state
  }
}

export default activities