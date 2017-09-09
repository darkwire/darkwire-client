import { connect } from 'react-redux'
import Home from '../components/Home.jsx'
import { push, fetchBlockByName, fetchSequenceByName } from '../actions'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  push,
  fetchBlockByName,
  fetchSequenceByName
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)