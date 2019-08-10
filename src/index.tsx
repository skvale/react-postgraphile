import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import postgraphileClient from './clients/postgraphile'
import Cookies from 'js-cookie'

import { App } from './app/app'

import './index.css'

const JwtWrapper = () => {
  const [token, setToken] = useState<string>(
    Cookies.get('postgraphile-jwt') || ''
  )

  useEffect(() => {
    Cookies.set('postgraphile-jwt', token || '')
  }, [token])

  return (
    <ApolloProvider client={postgraphileClient(token)}>
      <App updateToken={setToken} />
    </ApolloProvider>
  )
}

ReactDOM.render(<JwtWrapper />, document.getElementById('root'))
