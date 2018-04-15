import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'src/reducers'
import ApolloProvider from 'src/apollo-provider'

import 'src/index.css'
import 'bulma/css/bulma.css'

ReactDOM.render(
  <ReduxProvider store={store}>
    <ApolloProvider />
  </ReduxProvider>
, document.getElementById('root'))
