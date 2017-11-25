import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortId from 'shortid'
import { Info, Settings, PlusCircle, User, Users, Lock, Unlock, Star } from 'react-feather'
import logoImg from 'img/logo.png'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import Username from 'components/Username'
import Clipboard from 'clipboard'

class Nav extends Component {
  componentDidMount() {
    const clip = new Clipboard('.clipboard-trigger')

    clip.on('success', () => {
      $('.room-id').tooltip('show')
      setTimeout(() => {
        $('.room-id').tooltip('hide')
      }, 3000)
    })

    $(() => {
      $('.room-id').tooltip({
        trigger: 'manual',
      })
      $('.lock-room').tooltip({
        trigger: 'manual',
      })
    })
  }

  componentDidUpdate() {
    $(() => {
      $('.me-icon-wrap').tooltip()
      $('.owner-icon-wrap').tooltip()
    })
  }

  newRoom() {
    $('.navbar-collapse').collapse('hide')
    window.open(`/${shortId.generate()}`)
  }

  handleSettingsClick() {
    $('.navbar-collapse').collapse('hide')
    this.props.openModal('Settings')
  }

  handleAboutClick() {
    $('.navbar-collapse').collapse('hide')
    this.props.openModal('About')
  }

  handleToggleLock() {
    if (!this.props.iAmOwner) {
      $('.lock-room').tooltip('show')
      setTimeout(() => $('.lock-room').tooltip('hide'), 3000)
      return
    }
    this.props.toggleLockRoom()
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="meta">
          <a className="navbar-brand" href="#"><img src={logoImg} alt="Darkwire" className="logo" /></a>

          <button
            data-toggle="tooltip"
            data-placement="bottom"
            title="Copied"
            data-clipboard-text={`https://darkwire.io/${this.props.roomId}`}
            className="btn btn-plain btn-link clipboard-trigger room-id ellipsis">
            {`/${this.props.roomId}`}
          </button>

          <span className="lock-room-container">
            <button
              onClick={this.handleToggleLock.bind(this)}
              className="lock-room btn btn-link btn-plain"
              data-toggle="tooltip"
              data-placement="bottom"
              title="You must be the owner to lock or unlock the room"
            >
              {this.props.roomLocked &&
                <Lock />
              }
              {!this.props.roomLocked &&
                <Unlock className="muted" />
              }
            </button>
          </span>

          <Dropdown className="members-dropdown">
            <DropdownTrigger>
              <button className="btn btn-link btn-plain members-action">
                <Users className="users-icon" />
              </button>
              <span>{this.props.members.length}</span>
            </DropdownTrigger>
            <DropdownContent>
              <ul>
                {this.props.members.map((member, index) => (
                  <li key={`user-${index}`}>
                    <Username username={member.username} />
                    <span className="icon-container">
                      {member.username === this.props.username &&
                        <span data-toggle="tooltip" data-placement="bottom" title="Me" className="me-icon-wrap">
                          <User className="me-icon" />
                        </span>
                      }
                      {member.isOwner &&
                        <span data-toggle="tooltip" data-placement="bottom" title="Owner" className="owner-icon-wrap">
                          <Star className="owner-icon" />
                        </span>
                      }
                    </span>
                  </li>
                ))}
              </ul>
            </DropdownContent>
          </Dropdown>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={this.newRoom.bind(this)}target="blank"><PlusCircle /> <span>New Room</span></a>
            </li>
            <li className="nav-item">
              <a onClick={this.handleSettingsClick.bind(this)} className="nav-link" href="#"><Settings /> <span>Settings</span></a>
            </li>
            <li className="nav-item">
              <a onClick={this.handleAboutClick.bind(this)} className="nav-link" href="#"><Info /> <span>About</span></a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  members: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  roomLocked: PropTypes.bool.isRequired,
  toggleLockRoom: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  iAmOwner: PropTypes.bool.isRequired,
}

export default Nav
