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

  componentWillUnmount() {
    $('.copy-room').tooltip('hide')
  }

  render() {
    return (
      <div>
        <div>
          v2.0 is a complete rewrite and includes several new features. Here are some highlights:
          <ul className="native">
            <li>Support on all modern browsers (Chrome, Firefox, Safari, Safari iOS, Android)</li>
            <li>Slash commands (/nick, /me, /clear)</li>
            <li>Room owners can lock the room, preventing anyone else from joining</li>
            <li>Front-end rewritten in React.js and Redux</li>
            <li>Send files up to 4 MB</li>
          </ul>
          <div>          
            You can learn more <a href="https://github.com/seripap/darkwire.io" target="_blank">here</a>.
          </div>
        </div>
        <br />
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="room-url">You&#39;re the first one here. Invite others using the following URL:</label>
            <div className="input-group">
              <input id="room-url" className="form-control" type="text" readOnly placeholder={this.state.roomUrl} />
              <span className="input-group-btn">
                <button
                  className="copy-room btn btn-secondary"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  data-clipboard-text={this.state.roomUrl}
                  title="Copied!"
                >
                  <Copy className="mt-1" />
                </button>
              </span>
            </div>
          </div>
        </form>
        <div className="react-modal-footer">
          <button className="btn btn-primary btn-lg" onClick={this.props.close}>Ok</button>
        </div>
      </div>
    )
  }
}

Welcome.propTypes = {
  roomId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
}

export default Welcome
