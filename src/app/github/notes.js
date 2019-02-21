import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

const NotesCreator = pullRequest => {
  class Notes extends React.Component {
    static propTypes = {
      createPrNote: PropTypes.func,
      data: PropTypes.shape({
        loading: PropTypes.bool,
        prNoteByPullRequest: PropTypes.shape({
          content: PropTypes.string
        }),
        refetch: PropTypes.func
      }),
      updatePrNote: PropTypes.func
    }

    constructor (props) {
      super(props)
      this.state = {
        value:
          (props.data &&
            props.data.prNoteByPullRequest &&
            props.data.prNoteByPullRequest.content) ||
          ''
      }
    }

    componentDidUpdate (prevProps) {
      const { data } = this.props
      const { data: prevData } = prevProps

      if (
        data &&
        data.prNoteByPullRequest &&
        (!prevData ||
          !prevData.prNoteByPullRequest ||
          data.prNoteByPullRequest.content !==
            prevData.prNoteByPullRequest.content)
      ) {
        this.setState({
          value: data.prNoteByPullRequest.content
        })
      }
    }

    onChange = e => {
      this.setState({
        value: e.target.value
      })
    }

    create = () => {
      this.props
        .createPrNote({ pullRequest, content: '' })
        .then(this.props.data.refetch)
    }

    update = () => {
      this.props
        .updatePrNote({ pullRequest, content: this.state.value })
        .then(this.props.data.refetch)
    }

    render () {
      return (
        <div>
          {!this.props.data.loading && !this.props.data.prNoteByPullRequest && (
            <button className='button' onClick={this.create}>
              Create
            </button>
          )}
          <button className='button' onClick={this.update}>
            Update
          </button>
          <div
            className={`control ${this.props.data.loading ? 'is-loading' : ''}`}
          >
            <textarea
              className='textarea'
              onChange={this.onChange}
              value={this.state.value}
            />
          </div>
        </div>
      )
    }
  }

  const WrappedNotes = compose(
    graphql(
      gql`
        query getPrNoteByPullRequest($pullRequest: String!) {
          prNoteByPullRequest(pullRequest: $pullRequest) {
            content
            pullRequest
          }
        }
      `,
      {
        options: { variables: { pullRequest } }
      }
    ),
    graphql(
      gql`
        mutation createPrNote($pullRequest: String!, $content: String!) {
          createPrNote(
            input: { prNote: { pullRequest: $pullRequest, content: $content } }
          ) {
            prNote {
              pullRequest
            }
          }
        }
      `,
      {
        props: ({ mutate }) => ({
          createPrNote: variables => mutate({ variables })
        })
      }
    ),
    graphql(
      gql`
        mutation updatePrNoteByPullRequest(
          $pullRequest: String!
          $content: String!
        ) {
          updatePrNoteByPullRequest(
            input: {
              pullRequest: $pullRequest
              prNotePatch: { content: $content }
            }
          ) {
            prNote {
              content
            }
          }
        }
      `,
      {
        props: ({ mutate }) => ({
          updatePrNote: variables => mutate({ variables })
        })
      }
    )
  )(Notes)
  return WrappedNotes
}

export default NotesCreator
