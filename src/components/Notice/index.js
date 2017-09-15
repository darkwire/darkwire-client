import React, { PropTypes } from 'react'

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
