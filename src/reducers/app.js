const initialState = {
  modalComponent: null,
  scrolledToBottom: true,
  windowIsFocused: true,
  unreadMessageCount: 0,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalComponent: action.payload,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalComponent: null,
      }
    case 'SET_SCROLLED_TO_BOTTOM':
      return {
        ...state,
        scrolledToBottom: action.payload,
      }
    case 'TOGGLE_WINDOW_FOCUS':
      return {
        ...state,
        windowIsFocused: action.payload,
        unreadMessageCount: 0,
      }
    case 'HANDLE_SOCKET_MESSAGE_SEND_MESSAGE':
      return {
        ...state,
        unreadMessageCount: state.windowIsFocused ? 0 : state.unreadMessageCount + 1,
      }
    default:
      return state
  }
}

export default app
