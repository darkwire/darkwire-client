import React, { PropTypes } from 'react'
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css'
import ShepherdCSS from 'tether-shepherd/dist/css/shepherd-theme-dark.css'
import animateStyles from 'animate.css/animate.min.css'
import styles from '../stylesheets/app.sass'
import { Route } from 'react-router'
import { push } from 'react-router-redux'
import { getPublicRoutePaths, getPreventIfAuthenticatedPaths } from '../config/routes'
import Main from '../components/Main.jsx'
import Home from '../containers/Home'

class App extends React.Component {
  componentWillMount() {
    if ('ontouchstart' in document.documentElement) {
      document.body.classList.add('touch')      
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div>
        <div>
          <main>
            <Route path="/" component={Main}/>
            <Route path="/" exact component={Home}/>
          </main>
        </div>
      </div>
    )
  }
}

App.propTypes = {
}

export default App