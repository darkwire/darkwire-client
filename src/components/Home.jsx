import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from '../utils/crypto'
import io from '../utils/socket'

const crypto = new Crypto()

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    const roomId = crypto.getRandomBytes()

    io.emit('CREATE_ROOM', {
      roomId
    })
  }

  render() {
    return (
      <div className='container-fluid page landing-page'>
        <div>Hello World</div>
      </div>
    )
  }
}

Home.propTypes = {
}