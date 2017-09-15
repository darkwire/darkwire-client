import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomUrl: `https://darkwire.io/${props.roomId}`,
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>TOR Mirror: <a href="http://darkwirevqhjfmla.onion" target="_blank" rel="noopener noreferrer">http://darkwirevqhjfmla.onion</a></div>
          <br />
          <div>
            This software uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto" target="_blank" rel="noopener noreferrer">Web Cryptography API</a>
             to encrypt data which is transferred using <a href="https://en.wikipedia.org/wiki/WebSocket" target="_blank" rel="noopener noreferrer">secure WebSockets</a>.
            Messages are never stored on a server or sent over the wire in plain-text.
          </div>
          <br />
          <div>We believe in privacy and transparency.
          &nbsp;<a href="https://github.com/seripap/darkwire.io" target="_blank" rel="noopener noreferrer">View the source code and documentation on GitHub.</a></div>
        </div>
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="room-url">Invite people to this room</label>
            <input id="room-url" className="form-control" type="text" readOnly placeholder={this.state.roomUrl} />
          </div>
        </form>
      </div>
    )
  }
}

Welcome.propTypes = {
  roomId: PropTypes.string.isRequired,
}

export default Welcome
