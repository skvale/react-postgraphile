import graphql from 'graphql.js'
import Cookies from 'js-cookie'

const uri = 'http://localhost:5000/graphql'

export const createClient = (token = Cookies.get('postgraphile-jwt')) =>
  graphql(uri, {
    asJSON: true,
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {}
  })
