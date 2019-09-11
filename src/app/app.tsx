import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/react-hooks'
import { Query } from '../schema'
import { Routing } from './routing'
import { Nav } from './nav'

const currentPersonQuery = loader('./graphql/current-person-query.gql')

export type AppProps = {
  updateToken: (jwtToken: string) => void
}

export const App: React.FC<AppProps> = ({ updateToken }) => {
  const { loading, error, data: currentPersonData } = useQuery<{
    currentPerson: Query['currentPerson']
  }>(currentPersonQuery)
  if (error) {
    return <div>Error: {error.message}</div>
  }
  const currentPerson = currentPersonData && currentPersonData.currentPerson
  return (
    <div className='bg-gray-100 font-sans w-full min-h-screen m-0'>
      <Nav currentPerson={currentPerson} />
      <Routing
        currentPerson={currentPerson}
        loading={loading}
        updateToken={updateToken}
      />
    </div>
  )
}
