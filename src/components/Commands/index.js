import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Username from 'components/Username'
import validCommands from 'utils/commands'

const mapStateToProps = () => ({
})
class Commands extends Component {
  getCommand() {
    const { command, dispatch } = this.props
    const commandToExecute = validCommands.find(cmnd => cmnd.command === command.command)
    
    console.log('requested command:', commandToExecute)
    if (commandToExecute) {
      const { params } = command
      const commandResult = commandToExecute.action(params, dispatch)

      // Scope of command is to user only
      if (commandResult.scope === 'local') {
        return commandResult
      }

      // No? Dispatch global command here
      console.log(this.props.triggerCommand)
      return commandResult
    }

    return null
  }

  render() {
    const command = this.getCommand()

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
  command: PropTypes.object.isRequired,
  triggerCommand: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(Commands);
