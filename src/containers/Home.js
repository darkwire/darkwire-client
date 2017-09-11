import { connect } from 'react-redux'
import Home from '../components/Home.jsx'
import {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  createUser,
  userEnter,
  receiveUserExit,
  receiveUserEnter
} from '../actions'

const mapStateToProps = (state) => ({
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