export default (darkwire) => {
  const plugin = {
    name: 'Audio',
    settings: {
      soundEnabled: false,
    },
  }
  const beep = (window.Audio && new window.Audio('beep.mp3')) || false

  // Audio API not available
  if (!beep) {
    return false
  }

  darkwire.addPlugin(plugin)
}
