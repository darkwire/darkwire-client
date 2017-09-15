import { connect } from 'react-redux'
import Home from 'components/Home'
import {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  createUser,
  receiveUserExit,
  receiveUserEnter,
  toggleLockRoom,
  receiveToggleLockRoom,
  openModal,
  closeModal,
} from 'actions'

const mapStateToProps = state => ({
  activities: state.activities.items,
  username: state.user.username,
  publicKey: state.user.publicKey,
  members: state.room.members.filter(m => m.username && m.publicKey),
  roomId: state.room.id,
  roomLocked: state.room.isLocked,
  modalComponent: state.app.modalComponent,
})

const mapDispatchToProps = {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  receiveUserExit,
  receiveUserEnter,
  createUser,
  toggleLockRoom,
  receiveToggleLockRoom,
  openModal,
  closeModal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

