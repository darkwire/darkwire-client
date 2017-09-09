import { connect } from 'react-redux'
import Init from '../components/Init.jsx'
import { push } from '../actions'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  push
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)