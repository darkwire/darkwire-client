import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from '../utils/crypto'
import { connect } from '../utils/socket'

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
      this.props.receiveUserEnter(io, payload)
      this.props.sendSocketMessage(this.state.io, {
        type: 'ADD_USER',
        payload: {
          username: this.props.username,
          publicKey: this.props.publicKey
        }
      })
    })

    io.on('USER_ENTER_ECHO', (payload) => {
      this.props.receiveUserEnterEcho(io, payload)
      this.props.sendSocketMessage(this.state.io, {
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
    let username = await crypto.getRandomBytes()
    username = username.replace('-', '').substring(0, 10)

    const encryptDecryptKeys = await crypto.createEncryptDecryptKeys()
    const exportedEncryptDecryptPrivateKey = await crypto.exportKey(encryptDecryptKeys.privateKey)
    const exportedEncryptDecryptPublicKey = await crypto.exportKey(encryptDecryptKeys.publicKey)

    this.props.createUser(this.state.io, {
      username,
      publicKey: exportedEncryptDecryptPublicKey,
      privateKey: exportedEncryptDecryptPrivateKey
    })
  }

  handleFormSubmit(evt) {
    evt.preventDefault()

    this.props.sendSocketMessage(this.state.io, {
      type: 'SEND_MESSAGE',
      payload: {
        text: this.state.message
      }
    })
  }

  handleInputChange(evt) {
    this.setState({
      message: evt.target.value
    })
  }

  render() {
    return (
      <div className='container-fluid page landing-page'>
        <div>Hello World</div>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <input type="text" value={this.state.message} placeholder='Type here' onChange={this.handleInputChange.bind(this)}/>
        </form>
        
        <div>Members</div>
        <ul>
          {this.props.members.map((member, index) => (
            <li key={index}>{member.username}</li>
          ))}
        </ul>

        <ul>
          {this.props.messages.map((message, index) => (
            <li key={index}>
              <span>{message.text}</span><br/>
              <span>{message.sender}</span>
            </li>
          ))}
        </ul>
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
  receiveUserEnterEcho: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  publicKey: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired
}