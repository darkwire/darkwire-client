import Crypto from 'utils/crypto'
import shortId from 'shortid'
import {
  receiveSocketMessage,
  sendSocketMessage,
  receiveUserExit,
  receiveToggleLockRoom,
} from 'actions'
import { connect } from 'utils/socket'
import plugins from 'Darkwire/plugins'

const crypto = new Crypto()

export default class Darkwire {
  constructor(io, dispatch) {
    this.dispatch = dispatch
    this._io = connect(io)
    this.username = null
    this.publicKey = null
    this.settings = {
      plugins: {},
    }
    this.plugins = []
    this.addSocketListeners()
    this.registerPlugins()
  }

  addPlugin(plugin) {
    const { name, settings } = plugin
    this.settings = {
      ...this.settings,
      plugins: {
        ...this.settings.plugins,
        [name]: settings,
      },
    }
    console.log(this.settings)
    console.log(name, settings)
  }

  registerPlugins() {
    plugins.forEach((register) => {
      register(this)
    })
  }

  addSocketListeners() {
    this.createUser()
    this._io.on('USER_ENTER', (payload) => {
      this.dispatch({ type: 'USER_ENTER', payload })
      this.dispatch(sendSocketMessage({
        type: 'ADD_USER',
        payload: {
          username: this.username,
          publicKey: this.publicKey,
        },
      }))
    })

    this._io.on('USER_EXIT', (payload) => {
      this.dispatch(receiveUserExit(payload))
    })

    this._io.on('PAYLOAD', (payload) => {
      this.dispatch(receiveSocketMessage(payload))
    })

    this._io.on('TOGGLE_LOCK_ROOM', (payload) => {
      this.dispatch(receiveToggleLockRoom(payload))
    })
  }

  async createUser() {
    this.username = shortId.generate()

    const encryptDecryptKeys = await crypto.createEncryptDecryptKeys()
    const exportedEncryptDecryptPrivateKey = await crypto.exportKey(encryptDecryptKeys.privateKey)

    this.publicKey = await crypto.exportKey(encryptDecryptKeys.publicKey)

    const payload = {
      username: this.username,
      publicKey: this.publicKey,
      privateKey: exportedEncryptDecryptPrivateKey,
    }

    this._io.emit('USER_ENTER', {
      publicKey: payload.publicKey,
    })

    this.dispatch({ type: 'CREATE_USER', payload })
  }

  get socket() {
    return this._io
  }
}
