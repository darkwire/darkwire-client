const initialState = {
  modalComponent: null,
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
    default:
      return state
  }
}

export default app
