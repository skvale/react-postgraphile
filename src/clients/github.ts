import graphql from 'graphql.js'

export default (token: string) =>
  graphql('https://api.github.com/graphql', {
    headers: {
      'Access-Token': token
    }
  })
