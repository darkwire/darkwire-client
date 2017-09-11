import { connect } from 'react-redux'
import Home from '../components/Home.jsx'
import {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  createUser,
  userEnter,
  userExit
} from '../actions'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  createUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)