import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Person } from '../schema'

export const QUERY = gql`
  {
    currentPerson {
      fullName
      githubAuth
      id
    }
  }
`

const App = () => {
  const { loading, error, data } = useQuery<{ currentPerson: Person | null }>(
    QUERY
  )

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      User:{' '}
      {(data && data.currentPerson && data.currentPerson.firstName) ||
        'No user'}
    </div>
  )
}

export default App
