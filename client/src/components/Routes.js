import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Diary from './Diary/Diary'
import Search from './search'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/diary" component={Diary} />
        <Route path="/friends" component={Search} />
      </Switch>
    </Router>
  )
}

export default Routes
