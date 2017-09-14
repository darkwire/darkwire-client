import React, { PropTypes } from 'react'
import randomColor from 'randomcolor'

class Username extends React.Component {
  render() {
    return (
      <span className="username" style={{color: randomColor({seed: this.props.username})}}>
        {this.props.username}
      </span>
    )
  }
}

Username.propTypes = {
  username: PropTypes.string.isRequired
}

export default Username
