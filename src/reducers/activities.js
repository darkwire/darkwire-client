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
    case 'HANDLE_SOCKET_MESSAGE_SEND_MESSAGE':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload.payload,
            type: 'SEND_MESSAGE'
          }
        ]
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      const newUsername = action.payload.payload.username
      const userExists = action.payload.state.room.members.find(m => m.username === newUsername)
      if (userExists) {
        return state
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: newUsername,
            type: 'USER_ENTER'
          }
        ]
      }
    case 'USER_EXIT':
      if (!action.payload.username) {
        return state
      }
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
    case 'TOGGLE_LOCK_ROOM':
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: action.payload.username,
            type: 'TOGGLE_LOCK_ROOM',
            locked: action.payload.locked
          }
        ]
      }
    case 'RECEIVE_TOGGLE_LOCK_ROOM':
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: action.payload.username,
            type: 'TOGGLE_LOCK_ROOM',
            locked: action.payload.locked
          }
        ]
      }
    default:
      return state
  }
}

export default activities