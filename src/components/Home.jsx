import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Crypto from '../utils/crypto'
import { Activity, Info, Settings, PlusCircle, User, CornerDownRight } from 'react-feather';
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
      <div className="row h-100">
        <div className="col-3 sidebar">
          <div className="row bottom-border">
            <div className="col-12">
              <div className="p-1">
                <h2><Activity /> darkwire</h2>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="online-users">
                ONLINE - 1
              </div>
              <User /> Dan
            </div>
          </div>
        </div>
        <div className="col-9 offset-3 pt-3">
          <div className="row h-100">
            <div className="col-12">
              <div className="row bottom-border" style={{marginBottom: '20px'}}>
                <div className="col-9">
                  <div className="p-1">
                    /roomId
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-1">
                    <div className="row">
                      <div className="col">
                        <PlusCircle />
                      </div>
                      <div className="col">
                        <Settings />
                      </div>
                      <div className="col">
                        <Info />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-eq-height">
                <div className="col-12">
                  <div className="chat-message">
                    <div className="chat-meta"> 
                      <span className="username">Dan</span> <span className="timestamp">1 min ago</span>
                    </div>
                    <div className="chat">
                      <p>Hay</p>
                    </div>
                  </div>
                  <form onSubmit={this.handleFormSubmit.bind(this)} className="chat-preflight-container">
                    <input className="chat" type="text" value={this.state.message} placeholder='Type here' onChange={this.handleInputChange.bind(this)}/>
                    <div className="icon is-right">
                      <CornerDownRight />
                    </div>
                  </form>
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
