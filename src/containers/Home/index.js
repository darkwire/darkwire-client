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
  triggerCommand,
  receiveToggleLockRoom,
  openModal,
  closeModal,
  setScrolledToBottom,
} from 'actions'

const mapStateToProps = (state) => {
  const initialModal = state.room.members.length === 1 ? 'Welcome' : null

  return {
    activities: state.activities.items,
    username: state.user.username,
    publicKey: state.user.publicKey,
    members: state.room.members.filter(m => m.username && m.publicKey),
    roomId: state.room.id,
    roomLocked: state.room.isLocked,
    modalComponent: state.room.joining ? 'Connecting' : initialModal,
    scrolledToBottom: state.app.scrolledToBottom,
  }
}

const mapDispatchToProps = {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  receiveUserExit,
  receiveUserEnter,
  createUser,
  toggleLockRoom,
  triggerCommand,
  receiveToggleLockRoom,
  openModal,
  closeModal,
  setScrolledToBottom,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

