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
      this.props.receiveUserEnter(payload)
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
    console.log(encryptDecryptKeys.publicKey)
    console.log(exportedEncryptDecryptPublicKey)

    // const signVerifyKeys = await crypto.createSignVerifyKeys()
    // const exportedSignVerifyPrivateKey = await crypto.exportKey(signVerifyKeys.privateKey)
    // const exportedSignVerifyPublicKey = await crypto.exportKey(signVerifyKeys.publicKey)

    // this.props.createUser({
    //   username,
    //   encryptDecryptKeys: {
    //     publicKey: exportedEncryptDecryptPublicKey,
    //     privateKey: exportedEncryptDecryptPrivateKey
    //   },
    //   signVerifyKeys: {
    //     publicKey: exportedSignVerifyPublicKey,
    //     privateKey: exportedSignVerifyPrivateKey
    //   }
    // })

    this.props.createUser(this.state.io, {
      // type: 'USER_ENTER',
      // payload: {
      username,
      publicKey: exportedEncryptDecryptPublicKey
      // }
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
      </div>
    )
  }
}

Home.propTypes = {
  createRoom: PropTypes.func.isRequired,
  receiveSocketMessage: PropTypes.func.isRequired,
  sendSocketMessage: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  // userEnter: PropTypes.func.isRequired,
  receiveUserExit: PropTypes.func.isRequired,
  receiveUserEnter: PropTypes.func.isRequired
}