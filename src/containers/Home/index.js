import { connect } from 'react-redux'
import {
  createRoom,
  receiveSocketMessage,
  sendSocketMessage,
  receiveUserExit,
  receiveUserEnter,
  toggleLockRoom,
  receiveToggleLockRoom,
} from 'actions'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Nav from 'components/Nav'
import ChatInput from 'containers/Chat'
import Message from 'components/Message'
import Username from 'components/Username'
import Notice from 'components/Notice'
import Darkwire from 'Darkwire'

const mapStateToProps = state => ({
  activities: state.activities.items,
  username: state.user.username,
  publicKey: state.user.publicKey,
  members: state.room.members.filter(m => m.username && m.publicKey),
  roomId: state.room.id,
  roomLocked: state.room.isLocked,
})

class Home extends Component {
  async componentWillMount() {
    const { dispatch } = this.props
    const roomId = this.props.match.params.roomId

    await dispatch(createRoom(roomId))
    const darkwire = new Darkwire(roomId, dispatch)

    darkwire.createUser()
  }

  getActivityComponent(activity) {
    switch (activity.type) {
      case 'SEND_MESSAGE':
        return (
          <Message
            sender={activity.sender}
            message={activity.text}
            timestamp={activity.timestamp}
          />
        )
      case 'USER_ENTER':
        return (
          <Notice>
            <div><Username username={activity.username} /> joined</div>
          </Notice>
        )
      case 'USER_EXIT':
        return (
          <Notice>
            <div><Username username={activity.username} /> left</div>
          </Notice>
        )
      case 'TOGGLE_LOCK_ROOM':
        const lockedWord = activity.locked ? 'locked' : 'unlocked'
        return (
          <Notice>
            <div><Username username={activity.username} /> {lockedWord} the room</div>
          </Notice>
        )
      default:
        return false
    }
  }

  render() {
    return (
      <div className="h-100">
        <div className="nav-container">
          <Nav
            members={this.props.members}
            roomId={this.props.roomId}
            username={this.props.username}
            roomLocked={this.props.roomLocked}
            toggleLockRoom={this.props.toggleLockRoom}
          />
        </div>
        <div className="message-stream h-100">
          <ul>
            {this.props.activities.map((activity, index) => (
              <li key={index} className={`activity-item ${activity.type}`}>
                {this.getActivityComponent(activity)}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-container">
          <ChatInput />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)

