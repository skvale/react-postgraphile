import { normalize } from 'normalizr'
import { viewer } from 'src/reducers/schemas'

const GITHUB_SET_DATA = 'GITHUB_SET_DATA'

export const setGithubData = payload => ({
  type: GITHUB_SET_DATA,
  payload
})

const initialState = {
  pullRequests: {},
  repositories: {},
  users: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GITHUB_SET_DATA:
      if (!action.payload) {
        return {
          ...initialState,
          pullRequests: {},
          repositories: {},
          users: {}
        }
      }
      return {
        ...state,
        ...normalize(action.payload, viewer).entities
      }
    default:
      return state
  }
}