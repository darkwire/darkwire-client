import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Settings extends Component {
  handleSoundToggle() {
    this.props.toggleSoundEnabled(!this.props.soundIsEnabled)
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-check">
            <label className="form-check-label" htmlFor="sound-control">
              <input id="sound-control" onChange={this.handleSoundToggle.bind(this)} className="form-check-input" type="checkbox" checked={this.props.soundIsEnabled} />
              Sound
            </label>
          </div>
        </form>
      </div>
    )
  }
}

Settings.propTypes = {
  soundIsEnabled: PropTypes.bool.isRequired,
  toggleSoundEnabled: PropTypes.func.isRequired,
}

export default Settings
