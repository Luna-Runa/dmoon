import { combineReducers } from 'redux'
import user from './user.js'
import diary from './diary.js'
import session from './session.js'

const rootReducer = combineReducers({
  user,
  diary,
  session,
})

export default rootReducer
