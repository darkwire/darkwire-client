import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from '../utils/crypto'
import { connect } from '../utils/socket'

const crypto = new Crypto()

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      io: null
    }
  }

  async componentWillMount() {
    const roomId = this.props.match.params.roomId

    await this.props.createRoom(roomId)
    console.log(roomId)

    this.state.io = connect(roomId)
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    this.state.io.emit('SEND_MESSAGE', {
      text: this.state.message
    })
  }

  handleInputChange(evt) {
    this.setState({
      message: evt.target.value
    })
  }

  render() {
    return (
      <div className='container-fluid page landing-page'>
        <div>Hello World</div>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <input type="text" value={this.state.message} placeholder='Type here' onChange={this.handleInputChange.bind(this)}/>
        </form>
      </div>
    )
  }
}

Home.propTypes = {
  createRoom: PropTypes.func.isRequired
}