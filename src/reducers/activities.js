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
    case 'SEND_SOCKET_MESSAGE_FILE_TRANSFER':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            type: 'FILE',
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
      const newUserId = action.payload.payload.id
      const activityExists = state.items.find(m => m.userId === newUserId)
      if (activityExists) {
        return state
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            userId: newUserId,
            type: 'USER_ENTER',
            username: action.payload.payload.username,
          },
        ],
      }
    case 'USER_EXIT':
      if (!action.payload.id) {
        return state
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            userId: action.payload.id,
            type: 'USER_EXIT',
            username: action.payload.username,
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
            userId: action.payload.id,
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
            userId: action.payload.id,
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
