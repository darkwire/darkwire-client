import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Activity, Info, Settings, PlusCircle, User, CornerDownRight } from 'react-feather';

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    this.sendMessage()
  }

  sendMessage() {
    if (!this.canSend()) {
      return
    }

    this.props.sendSocketMessage({
      type: 'SEND_MESSAGE',
      payload: {
        text: this.state.message,
        timestamp: Date.now()
      }
    })

    this.setState({
      message: ''
    })
  }

  handleInputChange(evt) {
    this.setState({
      message: evt.target.value
    })
  }

  canSend() {
    return this.state.message.trim().length
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)} className='chat-preflight-container'>
        <input autoFocus='autofocus' className="chat" type="text" value={this.state.message} placeholder='Type here' onChange={this.handleInputChange.bind(this)}/>
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
  sendSocketMessage: PropTypes.func.isRequired
}
