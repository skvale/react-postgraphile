import { ApolloClient } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const authLink = (token: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
})

export default (token: string) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink(token).concat(httpLink)
  })
