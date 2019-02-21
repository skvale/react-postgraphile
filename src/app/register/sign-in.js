import PropTypes from 'prop-types'
import React from 'react'
import EmailPasswordFields from './email-password-fields'

class SignIn extends React.Component {
  state = {
    error: '',
    failed: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props
      .signIn({
        email: this.email.value,
        password: this.password.value
      })
      .catch(e => {
        this.setState({
          error: e.message,
          failed: true
        })
      })
  }

  render () {
    return (
      <div className='container'>
        <h1 className='title'>Sign in</h1>
        {this.state.failed && ' * failed'}
        <form>
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

SignIn.propTypes = {
  signIn: PropTypes.func
}

export default SignIn
