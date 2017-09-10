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

    this.setState(
                  {io: connect(roomId)})
  }

  componentDidMount() {
    this.state.io.on('PAYLOAD', function (data) {
      console.log(data);
      // socket.emit('my other event', { my: 'data' });
    });
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    this.state.io.emit('PAYLOAD', {
      type: 'SEND_MESSAGE',
      payload: {
        text: this.state.message
      }
    })
  }

  handleInputChange(evt) {
    this.setState({
      message: evt.target.value
    })
  }

  render() {
    return (
      <div className='container-fluid'>
          <div className="row h-100">
          <div className="col-3 right-border">
            <div className="row bottom-border">
              <div className="col-12">
                <h1>darkwire</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                abc
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row h-100">
              <div className="col-12">
                <div className="row bottom-border">
                  <div className="col-9">
                    /roomId
                  </div>
                  <div className="col-3">
                    icons
                  </div>
                </div>
                <div className="row row-eq-height">
                  <div className="col-12">
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                      <textarea className="chat" type="text" value={this.state.message} placeholder='Type here' onChange={this.handleInputChange.bind(this)}/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Home.propTypes = {
  createRoom: PropTypes.func.isRequired
}