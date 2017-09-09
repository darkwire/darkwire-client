import { connect } from 'react-redux'
import Home from '../components/Home.jsx'
import { createRoom } from '../actions'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  createRoom
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)