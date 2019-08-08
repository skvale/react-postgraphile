import { ApolloClient } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const authLink = (auth: any) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: auth ? `Bearer ${auth}` : null
      }
    }
  })

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
})

export default (auth: any) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink(auth).concat(httpLink)
  })
