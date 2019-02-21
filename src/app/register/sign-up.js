import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import EmailPasswordFields from './email-password-fields'

class SignUp extends React.Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    const input = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value
    }
    this.props
      .registerPerson(input)
      .then(this.signIn(input.email, input.password))
      .catch(e => {
        this.setState({
          error: e.message,
          failed: true
        })
      })
  }

  signIn = (email, password) => () => {
    this.props.signIn({
      email,
      password
    })
  }

  render () {
    return (
      <div>
        <h1 className='title'>Register</h1>
        {this.state.failed && ' * failed'}
        <form>
          <div className='columns'>
            <div className='column field'>
              <label className='label' htmlFor='sign-in-first-name'>
                First name
              </label>
              <input
                className='input'
                id='sign-in-first-name'
                ref={el => {
                  this.firstName = el
                }}
                required
              />
            </div>
            <div className='column field'>
              <label className='label' htmlFor='sign-in-last-name'>
                Last name
              </label>
              <input
                className='input'
                id='sign-in-last-name'
                ref={el => {
                  this.lastName = el
                }}
                required
              />
            </div>
          </div>

          <EmailPasswordFields
            emailRef={el => {
              this.email = el
            }}
            passwordRef={el => {
              this.password = el
            }}
          />

          <button className='button is-link' onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        {this.state.error}
      </div>
    )
  }
}

SignUp.propTypes = {
  registerPerson: PropTypes.func,
  signIn: PropTypes.func
}

export default graphql(
  gql`
    mutation Register(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      registerPerson(
        input: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        }
      ) {
        person {
          fullName
        }
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      registerPerson: variables => mutate({ variables })
    })
  }
)(SignUp)
