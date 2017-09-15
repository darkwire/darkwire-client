import React from 'react'
import PropTypes from 'prop-types'

class Notice extends React.Component {
  render() {
    return (
      <div className="notice">
        {this.props.children}
      </div>
    )
  }
}

Notice.propTypes = {
}

export default Notice
