import React, { PropTypes } from 'react'
import { Activity, Info, Settings, PlusCircle, User, CornerDownRight } from 'react-feather';
import logoImg from '../img/logo.png'

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="meta">
          <a className="navbar-brand" href="#"><img src={logoImg} alt="Darkwire" className='logo'/></a>

          <span className="room-id">{`/${this.props.roomId}`}</span>
          <button className="btn btn-link members-action">
            <User/>
          </button>
          {/*<ul>
            {this.props.members.map((member, index) => (
              <li key={index}><User /> {member.username}</li>
            ))}
          </ul>
          */}
        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#"><PlusCircle/> New Room</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><Settings/> Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><Info/> About</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  members: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired
}

export default Nav