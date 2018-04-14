import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Fragment } from 'redux-little-router'
import App from  'src/app/app'
import Registration from 'src/app/register'
import Profile from 'src/app/github/profile/profile'
import SignOut from 'src/app/sign-out'
import Nav from 'src/app/nav'

class Routes extends React.Component {
  render () {
    return (
      <Fragment forRoute='/'>
        <div>
          <Nav />
          <Fragment forRoute='/'>
            <App />
          </Fragment>
          <Fragment forRoute='/sign-in'>
            <Registration />
          </Fragment>
          <Fragment forRoute='/profile'>
            <Profile />
          </Fragment>
          <Fragment forRoute='/sign-out'>
            <SignOut />
          </Fragment>
        </div>
      </Fragment>
    )
  }
}

export default Routes
