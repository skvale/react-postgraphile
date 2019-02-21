import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Link } from 'redux-little-router'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { setGithubData } from 'src/reducers/github'
import githubClient from 'src/clients/github'
import GithubPanel from 'src/app/github/github-panel'
import rough from 'roughjs'

import './github.css'

export class Github extends React.Component {
  componentDidMount () {
    if (this.canvas) {
      const rc = rough.canvas(this.canvas)
      rc.circle(195, 15, 24, { fill: '#309971' })
      rc.circle(240, 8, 14, { fill: '#f05020' })
      rc.circle(280, 16, 30, { fill: '#eeac29' })
    }
  }

  componentDidUpdate () {
    const { data, setGithubData } = this.props
    if (data.viewer) {
      setGithubData(data.viewer)
    }
  }

  render () {
    const { data } = this.props
    if (data.error) {
      return data.error.toString()
    }

    const user = data.loading ? null : data.viewer.name

    return (
      <div>
        <canvas
          className='rough-canvas'
          ref={el => {
            this.canvas = el
          }}
        />
        <div className='margin'>
          <div className='app-user'>User: {user}</div>
          <GithubPanel loading={data.loading} />
        </div>
      </div>
    )
  }
}

Github.propTypes = {
  data: PropTypes.shape({
    viewer: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    loading: PropTypes.bool.isRequired
  }).isRequired,
  setGithubData: PropTypes.func.isRequired
}

export const QUERY = gql`
  {
    viewer {
      id
      name
      pullRequests(last: 10, states: []) {
        nodes {
          id
          url
          title
          repository {
            id
            name
          }
          headRepositoryOwner {
            login
            avatarUrl
          }
        }
      }
    }
  }
`

export default auth => {
  return auth
    ? connect(
        null,
        { setGithubData: setGithubData }
      )(
        graphql(QUERY, {
          options: {
            client: githubClient(auth)
          }
        })(Github)
      )
    : () => (
        <div>
          No github token{' '}
          <Link className='button' href='/profile'>
            Set one
          </Link>
        </div>
      )
}
