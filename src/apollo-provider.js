import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import { connect } from 'react-redux'
import { push } from 'redux-little-router'
import postgraphileClient from 'src/clients/postgraphile'
import Routes from 'src/routes'

class Provider extends React.Component {
  componentDidMount() {
    const { navigateToSignIn, token } = this.props
    if(!token) {
      navigateToSignIn()
    }
  }

  render() {
    const { token } = this.props
    return (
      <ApolloProvider client={postgraphileClient(token)}>
        <Routes />
      </ApolloProvider>
    )
  }
}

Provider.propTypes = {
  navigateToSignIn: PropTypes.func,
  token: PropTypes.string
}

export default connect(
  ({ tokens }) => ({
    token: tokens.token
  }),
  dispatch => ({
    navigateToSignIn: () => dispatch(push('/sign-in'))
  })
)(Provider)
