import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'redux-little-router'
import { deleteCookie } from 'src/utils/cookies'
import { setToken } from  'src/reducers/tokens'
import { setUser } from  'src/reducers/users'
import { setGithubData } from 'src/reducers/github';

class SignOut extends React.Component {
  componentDidMount() {
    deleteCookie('jwt_token')
    this.props.signOut()
  }
  render() {
    return (
      <div className='sign-out'>
        Signed out
        <Link className='button' href='/sign-in'>Sign in</Link>
      </div>
    )
  }
}

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default connect(
  null,
  dispatch => ({
    signOut: () => {
      dispatch(setToken(undefined))
      dispatch(setUser(undefined))
      dispatch(setGithubData(undefined))
    }
  })
)(SignOut)
