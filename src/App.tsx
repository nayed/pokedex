import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from './context'
import Index from './components/layout/Index'
import Profile from './components/layout/Profile'

class App extends Component {
  render() {
    return (
      <Provider>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/profile/:name" component={Profile} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
