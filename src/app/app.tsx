import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/react-hooks'
import { Query } from '../schema'
import { LoginForm } from './login-form'
import { Button } from '../components/button'

const currentPersonQuery = loader('./graphql/current-person-query.gql')

type AppProps = {
  updateToken: (jwtToken: string) => void
}

export const App: React.FC<AppProps> = ({ updateToken }) => {
  const { loading, error, data: currentPersonData } = useQuery<{
    currentPerson: Query['currentPerson']
  }>(currentPersonQuery)

  const onLogout = () => {
    updateToken('')
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!currentPersonData || !currentPersonData.currentPerson) {
    return <LoginForm updateToken={updateToken} />
  }

  return (
    <div>
      <div>Hello: {currentPersonData.currentPerson.fullName}</div>
      <Button onClick={onLogout}>Log out</Button>
    </div>
  )
}
