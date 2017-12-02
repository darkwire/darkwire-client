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
          We&#39;ve placed you in a new chat room.
        </div>
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="room-url">Invite people using the following URL:</label>
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
          <button className='btn btn-primary btn-lg' onClick={this.props.close}>Ok</button>
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
