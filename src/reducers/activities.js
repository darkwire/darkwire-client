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
    case 'SHOW_NOTICE':
      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'NOTICE',
            message: action.payload.message,
          },
        ],
      }
    case 'SEND_SOCKET_MESSAGE_CHANGE_USERNAME':
      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'CHANGE_USERNAME',
            currentUsername: action.payload.currentUsername,
            newUsername: action.payload.newUsername,
          },
        ].map((item) => {
          if (['SEND_MESSAGE', 'USER_ACTION'].includes(item.type) && item.sender === action.payload.sender) {
            return {
              ...item,
              username: action.payload.newUsername,
            }
          }
          return item
        }),
      }
    case 'HANDLE_SOCKET_MESSAGE_CHANGE_USERNAME':
      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'CHANGE_USERNAME',
            currentUsername: action.payload.payload.currentUsername,
            newUsername: action.payload.payload.newUsername,
          },
        ].map((item) => {
          if (['SEND_MESSAGE', 'USER_ACTION'].includes(item.type) && item.sender === action.payload.payload.sender) {
            return {
              ...item,
              username: action.payload.payload.newUsername,
            }
          }
          return item
        }),
      }
    case 'SEND_SOCKET_MESSAGE_USER_ACTION':
      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'USER_ACTION',
            ...action.payload,
          },
        ],
      }
    case 'HANDLE_SOCKET_MESSAGE_USER_ACTION':
      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'USER_ACTION',
            ...action.payload.payload,
          },
        ],
      }
    default:
      return state
  }
}

export default activities
