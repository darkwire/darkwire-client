import { connect } from 'react-redux'
import Home from '../components/Home.jsx'
import {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  createUser,
  userEnter,
  receiveUserExit,
  receiveUserEnter,
  addUser
} from '../actions'

const mapStateToProps = (state) => ({
  messages: state.activities.items,
  username: state.user.username,
  publicKey: state.user.publicKey,
  members: state.room.members.filter(m => m.username && m.publicKey)
})

const mapDispatchToProps = {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  receiveUserExit,
  receiveUserEnter,
  createUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)