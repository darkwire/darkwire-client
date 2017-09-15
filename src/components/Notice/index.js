import React from 'react'
import PropTypes from 'prop-types'

const Notice = props => (<div>
  {props.children}
</div>)

Notice.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Notice
