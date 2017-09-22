import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html'
import { CornerDownRight } from 'react-feather'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
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
      this.props.sendSocketMessage({
        type: 'SLASH_COMMAND',
        payload: {
          command: isCommand,
          timestamp: Date.now(),
        },
      })
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
        <input autoFocus="autofocus" className="chat" type="text" value={this.state.message} placeholder="Type here" onChange={this.handleInputChange.bind(this)} />
        <div className="input-controls">
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
}
