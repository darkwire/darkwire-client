import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { styles } from './styles.css'

const Notice = props => (<div className={styles}>

  <div className={classNames(styles, {
    info: props.level === 'info',
    warning: props.level === 'warning',
    danger: props.level === 'danger',
  })}>{props.children}</div>
</div>)

Notice.defaultProps = {
  level: 'info',
}

Notice.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string,
}

export default Notice
