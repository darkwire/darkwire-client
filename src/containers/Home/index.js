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
  setScrolledToBottom,
  sendUserEnter,
  toggleWindowFocus,
  toggleSoundEnabled,
} from 'actions'

const mapStateToProps = (state) => {
  const me = state.room.members.find(m => m.username === state.user.username)

  return {
    activities: state.activities.items,
    userId: state.user.id,
    username: state.user.username,
    publicKey: state.user.publicKey,
    privateKey: state.user.privateKey,
    members: state.room.members.filter(m => m.username && m.publicKey),
    roomId: state.room.id,
    roomLocked: state.room.isLocked,
    modalComponent: state.app.modalComponent,
    scrolledToBottom: state.app.scrolledToBottom,
    iAmOwner: Boolean(me && me.isOwner),
    joining: state.room.joining,
    faviconCount: state.app.unreadMessageCount,
    soundIsEnabled: state.app.soundIsEnabled,
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
  receiveToggleLockRoom,
  openModal,
  closeModal,
  setScrolledToBottom,
  sendUserEnter,
  toggleWindowFocus,
  toggleSoundEnabled,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

