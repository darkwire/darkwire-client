const triggerCommands = [{
  command: 'nick',
  description: 'Changes nickname.',
  paramaters: ['{username}'],
  multiple: false,
  usage: '/nick {username}',
  action: () => {
    let newUsername = trigger.params[0] || false

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
  multiple: false,
  usage: '/help',
  action: () => {
    validCommands = validCommands.map(command => `/${command}`)

    this.log(`Valid commands: ${validCommands.sort().join(', ')}`, { notice: true })
  },
}, {
  command: 'me',
  description: 'Invoke virtual action',
  paramaters: ['{action}'],
  multiple: true,
  usage: '/me {action}',
  action: () => {
    expectedParams = 100

    const actionMessage = trigger.params.join(' ')

    this.darkwire.encodeMessage(actionMessage, 'action').then((socketData) => {
      this.addChatMessage({
        username,
        message: actionMessage,
        messageType: 'action',
      })
      this.socket.emit('new message', socketData)
    }).catch((err) => {
      console.log(err)
    })
  },
}, {
  command: 'clear',
  description: 'Clears the chat screen',
  paramaters: [],
  multiple: true,
  usage: '/clear',
  action: () => {
    this.clear()
  },
}]
