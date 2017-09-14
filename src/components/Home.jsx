import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from '../utils/crypto'
import { Activity, Info, Settings, PlusCircle, User, CornerDownRight } from 'react-feather';
import { connect } from '../utils/socket'
import Nav from './Nav.jsx'
import logoImg from '../img/logo.png'
import shortId from 'shortid'
import ChatInput from '../containers/chat/Input'

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

  render() {
    return (
      <div className='h-100'>
        <div className="nav-container">
          <Nav
            members={this.props.members}
            roomId={this.props.roomId}
          />
        </div>
        <div className="message-stream h-100">
          <ul>
            {this.props.messages.map((message, index) => (
              <li key={index}>
                <div className="chat-message">
                  <div className="chat-meta"> 
                    <span className="username">{message.sender}</span> <span className="timestamp">1 min ago</span>
                  </div>
                  <div className="chat">
                    <p>{message.text}</p>
                  </div>
                </div>
              </li>
            ))}
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
  messages: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  publicKey: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired
}
