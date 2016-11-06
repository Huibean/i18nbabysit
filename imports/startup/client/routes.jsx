import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from '../../ui/App.jsx'

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  ), document.getElementById('react-root'))
})