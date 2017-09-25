const commands = [{
  command: 'nick',
  description: 'Changes nickname.',
  paramaters: ['{username}'],
  usage: '/nick {username}',
  scope: 'global',
  action: (params, dispatch) => { // eslint-disable-line
    let newUsername = trigger.params[0] || false // eslint-disable-line

    if (newUsername.toString().length > 16) {
      return this.log('Username cannot be greater than 16 characters.', { error: true })
    }

    // Remove things that arent digits or chars
    newUsername = newUsername.replace(/[^A-Za-z0-9]/g, '-')

    if (!newUsername.match(/^[A-Z]/i)) {
      return this.log('Username must start with a letter.', { error: true })
    }
  },
}, {
  command: 'help',
  description: 'Shows a list of commands.',
  paramaters: [],
  usage: '/help',
  scope: 'local',
  action: (params, dispatch) => { // eslint-disable-line
    console.log('PARAMS:', params)
    const validCommands = commands.map(command => `/${command.command}`)
    return {
      message: `Valid commands: ${validCommands.sort().join(', ')}`,
      level: 'notice',
    }
  },
}, {
  command: 'me',
  description: 'Invoke virtual action',
  paramaters: ['{action}'],
  usage: '/me {action}',
  scope: 'global',
  action: (params, dispatch) => { // eslint-disable-line

    // const actionMessage = trigger.params.join(' ')

    // this.darkwire.encodeMessage(actionMessage, 'action').then((socketData) => {
    //   this.addChatMessage({
    //     username,
    //     message: actionMessage,
    //     messageType: 'action',
    //   })
    //   this.socket.emit('new message', socketData)
    // }).catch((err) => {
    //   console.log(err)
    // })
  },
}, {
  command: 'clear',
  description: 'Clears the chat screen',
  paramaters: [],
  usage: '/clear',
  scope: 'local',
  action: (params = null, dispatch) => { // eslint-disable-line
    dispatch({
      type: 'CLEAR_ACTIVITIES',
    })
  },
}]

export default commands
