import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import Username from 'components/Username'
import validCommands from 'utils/commands'

class Commands extends Component {
  render() {
    return (
      <div>
        <div className="chat-meta">
          <Username username={this.props.sender} />
          <span className="muted timestamp">
            THIS IS A COMMAND
          </span>
        </div>
        <div className="chat">
          <p>{this.props.message}</p>
        </div>
      </div>
    )
  }
}

Commands.propTypes = {
  sender: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  trigger: PropTypes.object.isRequired,
}

export default Commands
