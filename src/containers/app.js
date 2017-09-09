import { connect } from 'react-redux'
import { checkAuth, startSequence } from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)