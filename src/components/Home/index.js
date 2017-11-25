import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Crypto from 'utils/crypto'
import { connect } from 'utils/socket'
import Nav from 'components/Nav'
import shortId from 'shortid'
import ChatInput from 'containers/Chat'
import Connecting from 'components/Connecting'
import Message from 'components/Message'
import Username from 'components/Username'
import Notice from 'components/Notice'
import Modal from 'react-modal'
import About from 'components/About'
import Settings from 'components/Settings'
import Welcome from 'components/Welcome'
import RoomLocked from 'components/RoomLocked'
import { X } from 'react-feather'
import { defer } from 'lodash'
import Tinycon from 'tinycon'

const crypto = new Crypto()

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focusChat: false,
    }
  }

  async componentWillMount() {
    const roomId = this.props.match.params.roomId

    const res = await this.props.createRoom(roomId)

    if (res.json.isLocked) {
      this.props.openModal('Room Locked')
      return
    }

    if (res.json.size === 1) {
      this.props.openModal('Welcome')
    }

    const io = connect(roomId)

    await this.createUser()

    io.on('USER_ENTER', (payload) => {
      this.props.receiveUserEnter(payload)
      this.props.sendSocketMessage({
        type: 'ADD_USER',
        payload: {
          username: this.props.username,
          publicKey: this.props.publicKey,
          isOwner: this.props.iAmOwner,
          id: this.props.userId,
        },
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

    const { username, publicKey, privateKey } = this.props

    this.props.sendUserEnter({
      username,
      publicKey,
      privateKey,
    })
  }

  componentDidMount() {
    this.bindEvents()

    if (this.props.joining) {
      this.props.openModal('Connecting')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.joining && !nextProps.joining) {
      this.props.closeModal()
    }

    Tinycon.setBubble(nextProps.faviconCount)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activities.length < this.props.activities.length) {
      if (this.props.scrolledToBottom) {
        this.messageStream.scrollTop = this.messageStream.scrollHeight
      }
    }
  }

  onScroll() {
    const messageStreamHeight = this.messageStream.clientHeight
    const activitiesListHeight = this.activitiesList.clientHeight

    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = this.activitiesList.getBoundingClientRect()
    const offset = elemRect.top - bodyRect.top
    const activitiesListYPos = offset

    const scrolledToBottom = (activitiesListHeight + activitiesListYPos + 70) === messageStreamHeight

    if (scrolledToBottom) {
      if (!this.props.scrolledToBottom) {
        this.props.setScrolledToBottom(true)
      }
    } else if (this.props.scrolledToBottom) {
      this.props.setScrolledToBottom(false)
    }
  }

  getActivityComponent(activity) {
    switch (activity.type) {
      case 'SEND_MESSAGE':
        return (
          <Message
            sender={activity.username}
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
      case 'NOTICE':
        return (
          <Notice>
            <div>{activity.message}</div>
          </Notice>
        )
      case 'CHANGE_USERNAME':
        return (
          <Notice>
            <div><Username username={activity.currentUsername} /> changed their name to <Username username={activity.newUsername} /></div>
          </Notice>
        )
      case 'USER_ACTION':
        return (
          <Notice>
            <div><Username username={activity.username} /> {activity.action}</div>
          </Notice>
        )
      default:
        return false
    }
  }

  getModal() {
    switch (this.props.modalComponent) {
      case 'Connecting':
        return {
          component: <Connecting />,
          title: 'Connecting...',
          preventClose: true,
        }
      case 'About':
        return {
          component: <About />,
          title: 'About',
        }
      case 'Settings':
        return {
          component: <Settings />,
          title: 'Settings',
        }
      case 'Welcome':
        return {
          component: <Welcome roomId={this.props.roomId} />,
          title: 'Welcome to Darkwire v2',
        }
      case 'Room Locked':
        return {
          component: <RoomLocked />,
          title: 'This room is locked',
          preventClose: true,
        }
      default:
        return {
          component: null,
          title: null,
        }
    }
  }

  bindEvents() {
    this.messageStream.addEventListener('scroll', this.onScroll.bind(this))

    window.onfocus = () => {
      this.props.toggleWindowFocus(true)
    }

    window.onblur = () => {
      this.props.toggleWindowFocus(false)
    }
  }

  async createUser() {
    const username = shortId.generate()

    const encryptDecryptKeys = await crypto.createEncryptDecryptKeys()
    const exportedEncryptDecryptPrivateKey = await crypto.exportKey(encryptDecryptKeys.privateKey)
    const exportedEncryptDecryptPublicKey = await crypto.exportKey(encryptDecryptKeys.publicKey)

    this.props.createUser({
      username,
      publicKey: exportedEncryptDecryptPublicKey,
      privateKey: exportedEncryptDecryptPrivateKey,
    })
  }

  handleChatClick() {
    this.setState({ focusChat: true })
    defer(() => this.setState({ focusChat: false }))
  }

  render() {
    const modalOpts = this.getModal()
    return (
      <div className="h-100">
        <div className="nav-container">
          <Nav
            members={this.props.members}
            roomId={this.props.roomId}
            username={this.props.username}
            roomLocked={this.props.roomLocked}
            toggleLockRoom={this.props.toggleLockRoom}
            openModal={this.props.openModal}
            iAmOwner={this.props.iAmOwner}
          />
        </div>
        <div onClick={this.handleChatClick.bind(this)} className="message-stream h-100" ref={el => this.messageStream = el}>
          <ul ref={el => this.activitiesList = el}>
            {this.props.activities.map((activity, index) => (
              <li key={index} className={`activity-item ${activity.type}`}>
                {this.getActivityComponent(activity)}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-container">
          <ChatInput focusChat={this.state.focusChat} />
        </div>
        <Modal
          isOpen={Boolean(this.props.modalComponent)}
          contentLabel="Modal"
          style={{ overlay: { zIndex: 10 } }}
          className={{
            base: 'react-modal-content',
            afterOpen: 'react-modal-content_after-open',
            beforeClose: 'react-modal-content_before-close',
          }}
          overlayClassName={{
            base: 'react-modal-overlay',
            afterOpen: 'react-modal-overlay_after-open',
            beforeClose: 'react-modal-overlay_before-close',
          }}
          shouldCloseOnOverlayClick={!modalOpts.preventClose}
          onRequestClose={this.props.closeModal}
        >
          <div className="react-modal-header">
            <h4 className="react-modal-title float-left">
              {modalOpts.title}
            </h4>
            {!modalOpts.preventClose &&
              <button onClick={this.props.closeModal} className="btn btn-link btn-plain close-modal">
                <X />
              </button>
            }
          </div>
          <div className="react-modal-component">
            {modalOpts.component}
          </div>
        </Modal>
      </div>
    )
  }
}

Home.defaultProps = {
  modalComponent: null,
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
  privateKey: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  roomLocked: PropTypes.bool.isRequired,
  toggleLockRoom: PropTypes.func.isRequired,
  receiveToggleLockRoom: PropTypes.func.isRequired,
  modalComponent: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  setScrolledToBottom: PropTypes.func.isRequired,
  scrolledToBottom: PropTypes.bool.isRequired,
  iAmOwner: PropTypes.bool.isRequired,
  sendUserEnter: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  joining: PropTypes.bool.isRequired,
  toggleWindowFocus: PropTypes.func.isRequired,
  faviconCount: PropTypes.number.isRequired,
}
