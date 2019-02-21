import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { push } from 'redux-little-router'
import { setCookie } from 'src/utils/cookies'
import { setToken } from 'src/reducers/tokens'
import { noAuthClient } from 'src/clients/postgraphile'

import SignUp from './sign-up'
import SignIn from './sign-in'

class Registration extends React.Component {
  state = {
    active: 'SIGN_IN'
  }

  signIn = input => this.props.authenticate(input).then(this.handleNewToken)

  handleNewToken = ({ data }) => {
    const { jwtToken } = data.authenticate
    if (jwtToken) {
      setCookie('jwt_token', jwtToken)
      this.props.setToken(jwtToken)
      this.props.navigateToHome()
    } else {
      this.setState({
        invalidCredentials: true
      })
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      active: prevState.active === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN',
      invalidCredentials: false
    }))
  }

  render () {
    return (
      <div>
        <div className='section'>
          {this.state.active === 'SIGN_IN' ? (
            <SignIn signIn={this.signIn} />
          ) : (
            <SignUp signIn={this.signIn} />
          )}
          <p className='help is-danger'>
            {this.state.invalidCredentials && ' * invalid login'}
          </p>
          <div>or</div>
          <button className='button' onClick={this.toggle}>
            {this.state.active === 'SIGN_IN'
              ? "I'm a new user"
              : 'I have an account'}
          </button>
        </div>
      </div>
    )
  }
}

Registration.propTypes = {
  authenticate: PropTypes.func.isRequired,
  navigateToHome: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired
}

const ApolloRegistration = graphql(
  gql`
    mutation Authenticate($email: String!, $password: String!) {
      authenticate(input: { email: $email, password: $password }) {
        jwtToken
      }
    }
  `,
  {
    options: {
      client: noAuthClient
    },
    props: ({ mutate }) => ({
      authenticate: variables => mutate({ variables })
    })
  }
)(Registration)

export default connect(
  null,
  dispatch => ({
    navigateToHome: () => dispatch(push('/')),
    setToken: token => dispatch(setToken(token))
  })
)(ApolloRegistration)
