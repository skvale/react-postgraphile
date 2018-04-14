import React from 'react'
import PropTypes from 'prop-types'

const EmailPasswordFields = ({ emailRef, passwordRef }) => {
  return (
    <div className='columns'>
      <div className='column field'>
        <label className='label' htmlFor='sign-in-email'>Email</label>
        <input
          className='input'
          type='email'
          id='sign-in-email'
          ref={emailRef}
          required
        />
      </div>
      <div className='column field'>
        <label className='label' htmlFor='sign-in-password'>Password</label>
        <input
          className='input'
          type='password'
          id='sign-in-password'
          ref={passwordRef}
          required
        />
      </div>
    </div>
  )
}

EmailPasswordFields.propTypes = {
  emailRef: PropTypes.func.isRequired,
  passwordRef: PropTypes.func.isRequired
}

export default EmailPasswordFields
