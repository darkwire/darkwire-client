import { push } from 'react-router-redux'
import React, { PropTypes } from 'react'
import Crypto from '../utils/crypto'
const crypto = new Crypto()

class Init extends React.Component {
  
  componentDidMount() {
    const roomId = crypto.getRandomBytes()
    this.props.push(`/${roomId}`)
  }

  render() {
    return (
      <div/>
    )
  }
}


Init.propTypes = {
  push: PropTypes.func.isRequired
}

export default Init