const initialState = {
//   privateKey: null,
//   publicKey: null,
// username: ''
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_USER':
      return action.payload
    default:
      return state
  }
}

export default user