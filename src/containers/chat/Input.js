import { connect } from 'react-redux'
import { sendSocketMessage } from '../../actions'
import ChatInput from '../../components/chat/Input.jsx'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  sendSocketMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInput)