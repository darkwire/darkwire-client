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
    case 'SEND_SOCKET_MESSAGE_SEND_MESSAGE':
    case 'HANDLE_SOCKET_MESSAGE_SEND_MESSAGE':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            type: 'SEND_MESSAGE'
          }
        ]
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: action.payload.username,
            type: 'USER_ENTER'
          }
        ]
      }
    case 'USER_EXIT':
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: action.payload.username,
            type: 'USER_EXIT'
          }
        ]
      }
    default:
      return state
  }
}

export default activities