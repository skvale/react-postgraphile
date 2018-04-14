import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { routerForBrowser } from 'redux-little-router'
import users from './users'
import tokens from './tokens'
import github from './github'

const routes = {
  '/profile': {
    title: 'Profile'
  },
  '/sign-in': {
    title: 'Sign in'
  },
  '/': {
    title: 'Home',
  }
}

const {
  reducer,
  middleware,
  enhancer
} = routerForBrowser({ routes })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const clientOnlyStore = createStore(
  combineReducers({
    router: reducer,
    users,
    tokens,
    github
  }),
  {},
  composeEnhancers(enhancer, applyMiddleware(middleware))
)

export default clientOnlyStore