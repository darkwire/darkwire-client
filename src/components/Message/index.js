import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Username from 'components/Username'
import moment from 'moment'

class Message extends Component {
  render() {
    return (
      <div>
        <div className="chat-meta">
          <Username username={this.props.sender} />
          <span className="muted timestamp">
            {moment(this.props.timestamp).format('LT')}
          </span>
        </div>
        <div className="chat">
          {decodeURI(this.props.message).split('\n').map((item, key) => {
            // preserve line breaks
            return <span key={key}>{item}<br/></span>
          })}
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}

export default Message
