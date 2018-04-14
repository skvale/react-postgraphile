import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Link } from 'redux-little-router'
import Github from 'src/app/github/github'
import { setUser } from 'src/reducers/users'

class App extends React.Component {
  componentDidUpdate() {
    const { data, setUser, user } = this.props
    if (data
      && data.currentPerson
      && (!user || data.currentPerson.id !== user.id)) {
      setUser(data.currentPerson)
     }
  }

  render () {
    const { data, user } = this.props
    if (data.loading) {
      return <div className='loading-text'></div>
    }
    if (!user) {
      return <Link className='button' href='/sign-in'>Sign in</Link>
    }

    const GithubComponent = Github(user.githubAuth)
    return (
      <div className='section main'>
        <div className='container'>
          <GithubComponent />
        </div>
      </div>
    )
  }
}

export const QUERY = gql`
{
  currentPerson {
    fullName
    githubAuth
    id
  }
}
`

App.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    githubAuth: PropTypes.string
  })
}

export default connect(
  ({ tokens, users }) => ({ token: tokens.token, user: users.user }),
  ({
    setUser
  })
)(graphql(QUERY)(App))
