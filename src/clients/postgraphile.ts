import { ApolloClient } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const uri = 'http://localhost:5000/graphql'

const httpLink = createHttpLink({ uri })

const authLink = (token: any) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  }))

export default function(token?: any) {
  if (!token) {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: httpLink
    })
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink(token).concat(httpLink)
  })
}
