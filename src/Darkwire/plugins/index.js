import Commands from './Commands'

const PLUGINS = [
  Commands,
]

export default class Plugins {
  constructor() {
    this._loadedPlugins = []
    this.registerPlugins()
  }

  registerPlugins() {
    PLUGINS.forEach(plugin => this._loadedPlugins.push(plugin))
  }

  get plugins() {
    return this._loadedPlugins
  }
}
