import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Diary from './Diary/Diary'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/diary" component={Diary} />
      </Switch>
    </Router>
  )
}

export default Routes
