import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Copy } from 'react-feather'
import Clipboard from 'clipboard'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomUrl: `https://darkwire.io/${props.roomId}`,
    }
  }

  componentDidMount() {
    const clip = new Clipboard('.copy-room')

    clip.on('success', () => {
      $('.copy-room').tooltip('show')
      setTimeout(() => {
        $('.copy-room').tooltip('hide')
      }, 3000)
    })

    $(() => {
      $('.copy-room').tooltip({
        trigger: 'manual',
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <div>TOR Mirror: <a href="http://darkwirevqhjfmla.onion" target="_blank" rel="noopener noreferrer">http://darkwirevqhjfmla.onion</a></div>
          <br />
          <div>
            This software uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto" target="_blank" rel="noopener noreferrer">Web Cryptography API</a> to encrypt data which is transferred using <a href="https://en.wikipedia.org/wiki/WebSocket" target="_blank" rel="noopener noreferrer">secure WebSockets</a>.
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
            <div className="input-group">
              <input id="room-url" className="form-control" type="text" readOnly placeholder={this.state.roomUrl} />
              <span className="input-group-btn">
                <button
                  className="copy-room btn btn-secondary"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  data-clipboard-text={this.state.roomUrl}
                  title='Copied!'
                >
                  <Copy className='mt-1'/>
                </button>
              </span>
            </div>
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
