import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { setUser } from 'src/reducers/users'

class Profile extends React.Component {
  state = {
    submitted: false,
    edit: false
  }

  cancel = () => {
    this.setState({
      edit: false
    })
  }

  edit = () => {
    this.setState({
      edit: true,
      submitted: false
    })
  }

  submit = () => {
    const { updateUserGithubAuth, user } = this.props
    updateUserGithubAuth({
      id: user.id,
      githubAuth: this.input.value
    }).then(({ data }) => this.props.setUser(data.updatePersonById.person))
    this.setState({
      submitted: true
    })
  }

  get content() {
    const { user } = this.props
    if (!user) {
      return '...'
    }
    if (user.githubAuth && !this.state.edit || this.state.submitted) {
      return (
        <div>
          Github token: {user.githubAuth}
          <div className='control'>
            <button className='button is-link' onClick={this.edit}>
              Edit
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='field'>
          <label className='label' htmlFor='profile-input'>Auth token</label>
          <input className='input' type='text' id='profile-input' ref={el => { this.input = el }} />
        </div>
        <div className='field is-grouped'>
          <div className='control'>
            <button className='button is-link' onClick={this.submit}>
              Save
            </button>
          </div>
          {user.githubAuth &&
            <div className='control'>
              <button className='button' onClick={this.cancel}>
                Cancel
              </button>
            </div>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='section'>
        {this.content}
      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    githubAuth: PropTypes.string
  }),
  setUser: PropTypes.func.isRequired,
  updateUserGithubAuth: PropTypes.func.isRequired
}

const WrappedProfile = graphql(
  gql`
  mutation UpdateUserGithubAuth ($id: Int!, $githubAuth: String!) {
    updatePersonById(input:{id: $id, personPatch:{githubAuth: $githubAuth}}) {
      person {
        fullName
        githubAuth
        id
      }
    }
  }`,
  {
    props: ({ mutate }) => ({
      updateUserGithubAuth: variables => mutate({ variables })
    })
  }
)(Profile)

export default connect(
  ({ users }) => ({
    user: users.user
  }),
  ({
    setUser
  })
)(WrappedProfile)