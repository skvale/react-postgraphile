import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import postgraphileClient from './clients/postgraphile'

import App from './app/app'

ReactDOM.render(
  <ApolloProvider client={postgraphileClient()}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
