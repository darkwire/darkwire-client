import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Info, Settings, PlusCircle, User, Users, Lock, Unlock } from 'react-feather'
import logoImg from 'img/logo.png'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import Username from 'components/Username'

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="meta">
          <a className="navbar-brand" href="#"><img src={logoImg} alt="Darkwire" className="logo" /></a>

          <span className="room-id">{`/${this.props.roomId}`}</span>

          <span className="lock-room-container">
            <button onClick={this.props.toggleLockRoom} className="lock-room btn btn-link btn-plain">
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
                    {member.username === this.props.username &&
                      <User className="me-icon" />
                    }
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
        <div className="collapse navbar-collapse h-100" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto h-100">
            <li className="nav-item">
              <a className="nav-link" href="/" target="blank"><PlusCircle /> New Room</a>
            </li>
            <li className="nav-item">
              <a onClick={() => this.props.openModal('Settings')} className="nav-link" href="#"><Settings /> Settings</a>
            </li>
            <li className="nav-item">
              <a onClick={() => this.props.openModal('About')} className="nav-link" href="#"><Info /> About</a>
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
}

export default Nav
