import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
      <div className='container-fluid page landing-page'>
        <div>Hello World</div>
      </div>
    )
  }
}

Home.propTypes = {
}