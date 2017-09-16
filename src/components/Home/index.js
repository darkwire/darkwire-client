import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Crypto from 'utils/crypto'
import { connect } from 'utils/socket'
import Nav from 'components/Nav'
import shortId from 'shortid'
import ChatInput from 'containers/Chat'
import Commands from 'components/Commands'
import Message from 'components/Message'
import Username from 'components/Username'
import Notice from 'components/Notice'
import Modal from 'react-modal'
import About from 'components/About'
import Settings from 'components/Settings'
import Welcome from 'components/Welcome'
import { X } from 'react-feather'

const crypto = new Crypto()

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false,
    }
  }

  async componentWillMount() {
    const roomId = this.props.match.params.roomId

    await this.props.createRoom(roomId)

    const io = connect(roomId)

    this.setState({
      ready: true,
    }, () => {
      io.on('USER_ENTER', (payload) => {
        this.props.receiveUserEnter(payload)
        this.props.sendSocketMessage({
          type: 'ADD_USER',
          payload: {
            username: this.props.username,
            publicKey: this.props.publicKey,
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

      this.createUser()

      this.props.openModal('Welcome')
    })
  }

  componentDidMount() {
    this.messageStream.addEventListener('scroll', () => {
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
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activities.length < this.props.activities.length) {
      if (this.props.scrolledToBottom) {
        this.messageStream.scrollTop = this.messageStream.scrollHeight
      }
    }
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
      case 'SLASH_COMMAND':
        return (
          <Commands
            sender={activity.sender}
            trigger={activity.trigger}
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
      case 'SYSTEM_NOTICE':
        return (
          <Notice>
            <div>{activity.message}</div>
          </Notice>
        )
      default:
        return false
    }
  }

  getModalComponent() {
    switch (this.props.modalComponent) {
      case 'About':
        return <About />
      case 'Settings':
        return <Settings />
      case 'Welcome':
        return <Welcome roomId={this.props.roomId} />
      default:
        return null
    }
  }

  getModalTitle() {
    switch (this.props.modalComponent) {
      case 'About':
        return 'About'
      case 'Settings':
        return 'Settings'
      case 'Welcome':
        return 'Welcome to Darkwire v2'
      default:
        return null
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

  render() {
    const { ready } = this.state

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
          />
        </div>
        <div className="message-stream h-100" ref={el => this.messageStream = el}>
          {!ready ? (
            <Notice level="warning">
              <div className="activity-item">
                Establishing a secure connection...
              </div>
            </Notice>) : null}
          <ul ref={el => this.activitiesList = el}>
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
          shouldCloseOnOverlayClick
          onRequestClose={this.props.closeModal}
        >
          <div className="react-modal-header">
            <h4 className="react-modal-title float-left">
              {this.getModalTitle()}
            </h4>
            <button onClick={this.props.closeModal} className="btn btn-link btn-plain close-modal">
              <X />
            </button>
          </div>
          <div className="react-modal-component">
            {this.getModalComponent()}
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
}
