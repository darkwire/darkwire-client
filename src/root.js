import 'react-simple-dropdown/styles/Dropdown.css'
import React from 'react'
import PropTypes from 'prop-types'
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css'
import styles from 'stylesheets/app.sass'
import { Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from 'containers/Home'
import io from 'utils/socket'
import shortId from 'shortid'


export default class Root extends React.Component {
  componentWillMount() {
    if ('ontouchstart' in document.documentElement) {
      document.body.classList.add('touch')      
    }
  }

  render() {
    return (<BrowserRouter>
      <div className="h-100">
            <Switch>
        <Route exact path="/" render={() => <Redirect to={`/${shortId.generate()}`}/> }/>
        <Route path="/:roomId" component={Home}/>
      </Switch>
      </div>
      </BrowserRouter>
    )
  }
}
