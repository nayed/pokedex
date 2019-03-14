import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from './context'
import Index from './components/layout/Index'
import Profile from './components/layout/Profile'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Provider>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/profile/:name" component={Profile} />
          </Switch>
        </Provider>
      </Router>
    )
  }
}

export default App
