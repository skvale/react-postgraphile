import { schema } from 'normalizr'

const repository = new schema.Entity('repositories')
const owner = new schema.Entity('owners')

const pullRequest = new schema.Entity('pullRequests', {
  headRepositoryOwner: owner,
  repository: repository
})

export const viewer = new schema.Entity('viewer', {
  repositories: {nodes: [ repository ]},
  pullRequests: {nodes: [ pullRequest ]},
  owners: {nodes: [ owner ]}
})
