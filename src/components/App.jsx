import React, { PropTypes } from 'react'
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css'
import ShepherdCSS from 'tether-shepherd/dist/css/shepherd-theme-dark.css'
import animateStyles from 'animate.css/animate.min.css'
import styles from '../stylesheets/app.sass'
import { Route } from 'react-router'
import { push } from 'react-router-redux'
import { getPublicRoutePaths, getPreventIfAuthenticatedPaths } from '../config/routes'
import Init from '../containers/Init'
import Home from '../containers/Home'
import io from '../utils/socket'

class App extends React.Component {
  componentWillMount() {
    if ('ontouchstart' in document.documentElement) {
      document.body.classList.add('touch')      
    }
  }


  render() {
    return (
      <div className="container-fluid h-100">
        <Route path="/" exact component={Init}/>
        <Route path="/:roomId" component={Home}/>
      </div>
    )
  }
}

App.propTypes = {
}

export default App
