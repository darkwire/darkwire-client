import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from '../utils/crypto'
import { Activity, Info, Settings, PlusCircle, User, CornerDownRight } from 'react-feather';
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
      <div className="row h-100">
        <div className="col-3 sidebar">
          <div className="page-header row bottom-border">
            <div className="col-12">
              <div className="p-1">
                <h2><Activity /> darkwire</h2>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="online-users">
                ONLINE - {this.props.members.length}
              </div>
              <ul>
                {this.props.members.map((member, index) => (
                  <li key={index}><User /> {member.username}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-9 offset-3">
          <div className="row h-100">
            <div className="col-12">
              <div className="page-header row bottom-border" style={{marginBottom: '20px'}}>
                <div className="col-9">
                  <div className="pt-3">
                    {`/${this.props.roomId}`}
                  </div>
                </div>
                <div className="col-3">
                  <div className="pt-3">
                    <div className="row">
                      <div className="col">
                        <PlusCircle />
                      </div>
                      <div className="col">
                        <Settings />
                      </div>
                      <div className="col">
                        <Info />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-eq-height">
                <div className="col-12">
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
              </div>
            </div>
            <div className="chat-container">
              <form onSubmit={this.handleFormSubmit.bind(this)} className='chat-preflight-container'>
                <input className="chat" type="text" value={this.state.message} placeholder='Type here' onChange={this.handleInputChange.bind(this)}/>
                <div className="icon is-right">
                  <CornerDownRight />
                </div>
              </form>
            </div>
          </div>
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
