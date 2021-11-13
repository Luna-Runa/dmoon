import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Diary from './Diary/Diary'
import DiaryList from './Diary/DiaryList'
import DiaryEdit from './Diary/DiaryEdit'
import Friends from './Friends'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/diary" component={Diary} />
      <Route path="/diary/list" component={DiaryList} />
      <Route path="/diary/:id" component={DiaryEdit} />
      <Route path="/friends" component={Friends} />
    </Switch>
  )
}

export default Routes
