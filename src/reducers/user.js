const initialState = {
  privateKey: {},
  publicKey: {},
  username: '',
  id: '',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...action.payload,
        id: action.payload.publicKey.n,
      }
    default:
      return state
  }
}

export default user
