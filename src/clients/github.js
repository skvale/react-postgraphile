import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const authLink = auth => setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: auth ? `Bearer ${auth}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

export default auth => new ApolloClient({
  link: authLink(auth).concat(httpLink),
  cache: new InMemoryCache()
})
