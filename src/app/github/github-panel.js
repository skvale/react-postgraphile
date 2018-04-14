import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Search from 'react-icons/lib/fa/search'
import PullRequest from 'react-icons/lib/go/git-pull-request'
import ExternalLink from 'react-icons/lib/fa/external-link'
import NotesCreator from './notes'

class GithubPanel extends React.Component {
  state = {
    selectedRow: undefined,
    filter: ''
  }

  selectRow = selectedRow => () => {
    this.setState({ selectedRow })
  }

  get renderTab() {
    const { pullRequests, repositories } = this.props
    const { selectedRow } = this.state
    return (
      <div>
        <table className='github-panel-table table is-fullwidth is-striped is-hoverable'>
          <tbody>
            {
              Object.values(pullRequests)
                .filter(pr => pr.title.toLowerCase().includes(this.state.filter.toLowerCase()))
                .sort((a, b) => repositories[a.repository].name.localeCompare(repositories[b.repository].name))
                .map(pr => (
                  <tr
                    onClick={this.selectRow(pr.id)}
                    className={`github-panel-table-row ${selectedRow === pr.id ? 'is-selected' : ''}`}
                    key={pr.id}
                  >
                    <td className='repo-name'>
                      <PullRequest className='icon is-small'/>
                      {repositories[pr.repository].name}
                    </td>
                    <td className='pull-request'>
                      {pr.title}
                    </td>
                    <td>
                      <a
                        className='button is-small'
                        href={pr.url}
                        target='_blank'
                      >
                        <ExternalLink className='github-panel-table-row-icon'/>
                      </a>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  search = e => {
    this.setState({
      filter: e.target.value
    }, this.filter)
  }

  get notes () {
    const { selectedRow } = this.state

    if (selectedRow) {
      const Component = NotesCreator(selectedRow)
      return <Component />
    }
    return null
  }

  render() {
    const { loading, pullRequests } = this.props
    const { filter } = this.state

    return (
      <div className='columns'>
        <nav className='column is-two-thirds panel'>
          <div className='panel-block'>
            <p className='control has-icons-left'>
              <input
                className='input is-small'
                onChange={this.search}
                value={filter}
                placeholder='search'
                type='text'
              />
              <span className='icon is-small is-left'>
                <Search />
              </span>
            </p>
          </div>
          {loading && [
            <div key={1} className='loading-panel'/>,
            <div key={2} className='loading-panel'/>,
            <div key={3} className='loading-panel'/>
          ]}
          {this.renderTab}
          {!loading && Object.values(pullRequests).length === 0 &&
            <div>No data</div>
          }
        </nav>
        <div className='columns is-one-third'>
          { this.notes }
        </div>
      </div>
    )
  }
}

GithubPanel.propTypes = {
  loading: PropTypes.bool,
  pullRequests: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    repository: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  })),
  repositories: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
  }))
}

export default connect(
  ({ github }) =>
    ({
      pullRequests: github.pullRequests,
      repositories: github.repositories
    })
)(GithubPanel)