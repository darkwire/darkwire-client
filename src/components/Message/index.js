import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import Username from 'components/Username'

class Message extends Component {
  render() {
    return (
      <div>
        <div className="chat-meta"> 
          <Username username={this.props.sender}/>
          <span className="muted timestamp">
            <TimeAgo date={this.props.timestamp} minPeriod={60} formatter={(value, unit, suffix) => {
              if (unit === 'second') {
                return 'just now'
              } else {
                return `${value} ${unit}${value > 1 ? 's' : ''} ${suffix}`
              }
          }} />
          </span>
        </div>
        <div className="chat">
          <p>{this.props.message}</p>
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired
}

export default Message
