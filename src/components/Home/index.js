import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from 'utils/crypto'
import { Activity, Info, Settings, PlusCircle, User, CornerDownRight } from 'react-feather';
import { connect } from 'utils/socket'
import Nav from 'components/Nav'
import logoImg from 'img/logo.png'
import shortId from 'shortid'
import ChatInput from 'containers/Chat'
import Message from 'components/Message'
import Username from 'components/Username'
import Notice from 'components/Notice'

const crypto = new Crypto()

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      io: null
    }
  }

  async componentWillMount() {
    const roomId = this.props.match.params.roomId

    await this.props.createRoom(roomId)

    const io = connect(roomId)

    this.setState({
      io
    })

    io.on('USER_ENTER', (payload) => {
      this.props.receiveUserEnter(payload)
      this.props.sendSocketMessage({
        type: 'ADD_USER',
        payload: {
          username: this.props.username,
          publicKey: this.props.publicKey
        }
      })
    })

    io.on('USER_EXIT', (payload) => {
      this.props.receiveUserExit(payload)
    })

    io.on('PAYLOAD', (payload) => {
      this.props.receiveSocketMessage(payload)
    })

    io.on('TOGGLE_LOCK_ROOM', (payload) => {
      this.props.receiveToggleLockRoom(payload)
    })

    this.createUser()
  }

  async createUser() {
    const username = shortId.generate()

    const encryptDecryptKeys = await crypto.createEncryptDecryptKeys()
    const exportedEncryptDecryptPrivateKey = await crypto.exportKey(encryptDecryptKeys.privateKey)
    const exportedEncryptDecryptPublicKey = await crypto.exportKey(encryptDecryptKeys.publicKey)

    this.props.createUser({
      username,
      publicKey: exportedEncryptDecryptPublicKey,
      privateKey: exportedEncryptDecryptPrivateKey
    })
  }

  getActivityComponent(activity) {
    switch(activity.type) {
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
            <div><Username username={activity.username}></Username> joined</div>
          </Notice>
        )
      case 'USER_EXIT':
        return (
          <Notice>
            <div><Username username={activity.username}></Username> left</div>
          </Notice>
        )
      case 'TOGGLE_LOCK_ROOM':
        const lockedWord = activity.locked ? 'locked' : 'unlocked'
        return (
          <Notice>
            <div><Username username={activity.username}></Username> {lockedWord} the room</div>
          </Notice>
        )
    }
  }

  render() {
    return (
      <div className='h-100'>
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
            {this.props.activities.map((activity, index) => {
              return (
                <li key={index} className={`activity-item ${activity.type}`}>
                  {this.getActivityComponent(activity)}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="chat-container">
          <ChatInput/>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  createRoom: PropTypes.func.isRequired,
  receiveSocketMessage: PropTypes.func.isRequired,
  sendSocketMessage: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  receiveUserExit: PropTypes.func.isRequired,
  receiveUserEnter: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  publicKey: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  roomLocked: PropTypes.bool.isRequired,
  toggleLockRoom: PropTypes.func.isRequired,
  receiveToggleLockRoom: PropTypes.func.isRequired
}
