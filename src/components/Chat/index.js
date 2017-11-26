import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html'
import FileTransfer from 'components/FileTransfer'
import { CornerDownRight } from 'react-feather'
import { connect } from 'react-redux'
import { clearActivities, showNotice } from '../../actions'
import { getSelectedText } from '../../utils/dom'

export class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }

    this.commands = [{
      command: 'nick',
      description: 'Changes nickname.',
      paramaters: ['{username}'],
      usage: '/nick {username}',
      scope: 'global',
      action: (params) => { // eslint-disable-line
        let newUsername = params.join(' ') || '' // eslint-disable-line

        // Remove things that arent digits or chars
        newUsername = newUsername.replace(/[^A-Za-z0-9]/g, '-')

        const errors = []

        if (!newUsername.trim().length) {
          errors.push('Username cannot be blank')
        }

        if (newUsername.toString().length > 16) {
          errors.push('Username cannot be greater than 16 characters')
        }

        if (!newUsername.match(/^[A-Z]/i)) {
          errors.push('Username must start with a letter')
        }

        if (errors.length) {
          return this.props.showNotice({
            message: `${errors.join(', ')}`,
            level: 'error',
          })
        }

        this.props.sendSocketMessage({
          type: 'CHANGE_USERNAME',
          payload: {
            id: this.props.userId,
            newUsername,
            currentUsername: this.props.username,
          },
        })
      },
    }, {
      command: 'help',
      description: 'Shows a list of commands.',
      paramaters: [],
      usage: '/help',
      scope: 'local',
      action: (params) => { // eslint-disable-line
        const validCommands = this.commands.map(command => `/${command.command}`)
        this.props.showNotice({
          message: `Valid commands: ${validCommands.sort().join(', ')}`,
          level: 'info',
        })
      },
    }, {
      command: 'me',
      description: 'Invoke virtual action',
      paramaters: ['{action}'],
      usage: '/me {action}',
      scope: 'global',
      action: (params) => { // eslint-disable-line
        const actionMessage = params.join(' ')

        this.props.sendSocketMessage({
          type: 'USER_ACTION',
          payload: {
            action: actionMessage,
          },
        })
      },
    }, {
      command: 'clear',
      description: 'Clears the chat screen',
      paramaters: [],
      usage: '/clear',
      scope: 'local',
      action: (params = null) => { // eslint-disable-line
        this.props.clearActivities()
      },
    }]
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focusChat) {
      if (!getSelectedText()) {
        this.textInput.focus()
      }
    }
  }

  executeCommand(command) {
    const commandToExecute = this.commands.find(cmnd => cmnd.command === command.command)

    if (commandToExecute) {
      const { params } = command
      const commandResult = commandToExecute.action(params)

      return commandResult
    }

    return null
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    this.sendMessage()
  }

  parseCommand(message) {
    const commandTrigger = {
      command: null,
      params: [],
    }

    if (message.charAt(0) === '/') {
      const parsedCommand = message.replace('/', '').split(' ')
      commandTrigger.command = sanitizeHtml(parsedCommand[0]) || null
      // Get params
      if (parsedCommand.length >= 2) {
        for (let i = 1; i < parsedCommand.length; i++) {
          commandTrigger.params.push(parsedCommand[i])
        }
      }

      return commandTrigger
    }

    return false
  }

  sendMessage() {
    if (!this.canSend()) {
      return
    }

    const { message } = this.state
    const isCommand = this.parseCommand(message)

    if (isCommand) {
      this.executeCommand(isCommand)
    } else {
      this.props.sendSocketMessage({
        type: 'SEND_MESSAGE',
        payload: {
          text: message,
          timestamp: Date.now(),
        },
      })
    }


    this.setState({
      message: '',
    })
  }

  handleInputChange(evt) {
    this.setState({
      message: evt.target.value,
    })
  }

  canSend() {
    return this.state.message.trim().length
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)} className="chat-preflight-container">
        <input ref={(input) => { this.textInput = input }} autoFocus className="chat" type="text" value={this.state.message} placeholder="Type here" onChange={this.handleInputChange.bind(this)} />
        <div className="input-controls">
          <FileTransfer sendSockMessage={this.props.sendSocketMessage} />
          <button onClick={this.sendMessage.bind(this)} className="icon is-right send btn btn-link">
            <CornerDownRight className={this.canSend() ? '' : 'disabled'} />
          </button>
        </div>
      </form>
    )
  }
}

Chat.propTypes = {
  sendSocketMessage: PropTypes.func.isRequired,
  showNotice: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  clearActivities: PropTypes.func.isRequired,
  focusChat: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  username: state.user.username,
  userId: state.user.id,
})

const mapDispatchToProps = {
  clearActivities,
  showNotice,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
