import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import Home from '../../ui/Home.jsx'

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
      </Route>
    </Router>
  ), document.getElementById('react-root'))
})