import React, { useState } from 'react'
import { loader } from 'graphql.macro'
import { print } from 'graphql'
import Cookies from 'js-cookie'
import { Routing } from './routing'
import { Nav } from './nav'
import { createClient } from '../clients/postgraphile'
import { useAsyncEffect } from '../utils'

const currentPersonQuery = loader('./graphql/current-person-query.gql')

export type AppProps = {}

export const App: React.FC<AppProps> = () => {
  const [token, setToken] = useState<string>(
    Cookies.get('postgraphile-jwt') || ''
  )
  const [currentUser, setUser] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useAsyncEffect(
    async signal => {
      const query = print(currentPersonQuery)
      const getCurrentUser = createClient(token)(query)
      setLoading(true)
      try {
        const currentUser = await getCurrentUser()
        if (!signal.aborted) {
          setUser(currentUser.currentPerson)
        }
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [token]
  )

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div className='bg-gray-100 font-sans w-full min-h-screen m-0'>
      <Nav currentUser={currentUser} />
      <Routing
        currentUser={currentUser}
        loading={loading}
        updateToken={setToken}
      />
    </div>
  )
}
