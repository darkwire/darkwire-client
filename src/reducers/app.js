const initialState = {
  modalComponent: 'Connecting',
  scrolledToBottom: true,
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
    default:
      return state
  }
}

export default app
