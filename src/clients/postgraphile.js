import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = "http://localhost:5000/graphql";

const httpLink = createHttpLink({ uri });

const authLink = token =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  }));

export default token => {
  return new ApolloClient({
    link: authLink(token).concat(httpLink),
    cache: new InMemoryCache()
  });
};

export const noAuthClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
