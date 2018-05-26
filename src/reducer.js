import { combineReducers } from 'redux'

import { counter } from './index.redux.index'
import { auth } from './Auth.redux'

export default combineReducers({counter, auth})