import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Diary from './Diary/Diary'
import DiaryList from './Diary/DiaryList'
import DiaryEdit from './Diary/DiaryEdit'
import Friends from './Friends'
import NotFound from './NotFound'
import Info from './Info'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/diary" component={Diary} />
      <Route path="/diary/list" component={DiaryList} />
      <Route path="/diary/edit/:id" component={DiaryEdit} />
      <Route path="/friends" component={Friends} />
      <Route path="/info" component={Info} />

      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes
