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
  receiveUserEnterEcho
} from '../actions'

const mapStateToProps = (state) => ({
  messages: state.activities.items
})

const mapDispatchToProps = {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  receiveUserExit,
  receiveUserEnter,
  receiveUserEnterEcho,
  createUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)