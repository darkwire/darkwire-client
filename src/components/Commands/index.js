import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import Username from 'components/Username'
import validCommands from 'utils/commands'

class Commands extends Component {
  parseCommand() {
    const { trigger } = this.props
    const command = validCommands.find(cmnd => cmnd.command === trigger.command)

    console.log('requested command:', command)
    if (command) {
      // pass dispatch here
      const commandResult = command.action()

      return commandResult
    }

    return null
  }

  render() {
    const command = this.parseCommand()

    if (!command) {
      return <div>Not a valid command</div>
    }

    return (
      <div>
        <div className="chat-meta">
          <span className="muted timestamp">
            {command.message}            
          </span>
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
