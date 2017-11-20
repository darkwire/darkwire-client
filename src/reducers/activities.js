const initialState = {
  items: [
    // {
    // type: 'message | file | isTyping | usernameChange | slashCommand',
    // data,
    // username,
    // timestamp
    // }
  ],
}

const activities = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_ACTIVITIES':
      return {
        ...state,
        items: [],
      }
    case 'SEND_SOCKET_MESSAGE_SLASH_COMMAND':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            type: 'SLASH_COMMAND',
          },
        ],
      }
    case 'SEND_SOCKET_MESSAGE_SEND_MESSAGE':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            type: 'SEND_MESSAGE',
          },
        ],
      }
    case 'HANDLE_SOCKET_MESSAGE_SEND_MESSAGE':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload.payload,
            type: 'SEND_MESSAGE',
          },
        ],
      }
    case 'HANDLE_SOCKET_MESSAGE_ADD_USER':
      const newUsername = action.payload.payload.username
      const activityExists = state.items.find(m => m.username === newUsername)
      if (activityExists) {
        return state
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: newUsername,
            type: 'USER_ENTER',
          },
        ],
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
            type: 'USER_EXIT',
          },
        ],
      }
    case 'TOGGLE_LOCK_ROOM':
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: action.payload.username,
            type: 'TOGGLE_LOCK_ROOM',
            locked: action.payload.locked,
          },
        ],
      }
    case 'RECEIVE_TOGGLE_LOCK_ROOM':
      return {
        ...state,
        items: [
          ...state.items,
          {
            username: action.payload.username,
            type: 'TOGGLE_LOCK_ROOM',
            locked: action.payload.locked,
          },
        ],
      }
    default:
      return state
  }
}

export default activities
