/* eslint-disable */
/*------------------
  This file is generated and should not be edited
--------------------*/
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any,
  /** 
 * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
 */
  Datetime: any,
  /** 
 * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
 */
  JwtToken: any,
};

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password: Scalars['String'],
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
   __typename?: 'AuthenticatePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  jwtToken?: Maybe<Scalars['JwtToken']>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
};

/** All input for the create `Person` mutation. */
export type CreatePersonInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Person` to be created by this mutation. */
  person: PersonInput,
};

/** The output of our create `Person` mutation. */
export type CreatePersonPayload = {
   __typename?: 'CreatePersonPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Person` that was created by this mutation. */
  person?: Maybe<Person>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>,
};


/** The output of our create `Person` mutation. */
export type CreatePersonPayloadPersonEdgeArgs = {
  orderBy?: Maybe<Array<PeopleOrderBy>>
};

/** All input for the create `PrNote` mutation. */
export type CreatePrNoteInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `PrNote` to be created by this mutation. */
  prNote: PrNoteInput,
};

/** The output of our create `PrNote` mutation. */
export type CreatePrNotePayload = {
   __typename?: 'CreatePrNotePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `PrNote` that was created by this mutation. */
  prNote?: Maybe<PrNote>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `PrNote`. May be used by Relay 1. */
  prNoteEdge?: Maybe<PrNotesEdge>,
};


/** The output of our create `PrNote` mutation. */
export type CreatePrNotePayloadPrNoteEdgeArgs = {
  orderBy?: Maybe<Array<PrNotesOrderBy>>
};



/** All input for the `deletePersonById` mutation. */
export type DeletePersonByIdInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The primary unique identifier for the person. */
  id: Scalars['Int'],
};

/** All input for the `deletePerson` mutation. */
export type DeletePersonInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The globally unique `ID` which will identify a single `Person` to be deleted. */
  nodeId: Scalars['ID'],
};

/** The output of our delete `Person` mutation. */
export type DeletePersonPayload = {
   __typename?: 'DeletePersonPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Person` that was deleted by this mutation. */
  person?: Maybe<Person>,
  deletedPersonId?: Maybe<Scalars['ID']>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>,
};


/** The output of our delete `Person` mutation. */
export type DeletePersonPayloadPersonEdgeArgs = {
  orderBy?: Maybe<Array<PeopleOrderBy>>
};

/** All input for the `deletePrNoteByPullRequest` mutation. */
export type DeletePrNoteByPullRequestInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The pr_notes key and pull request uuid in Github. */
  pullRequest: Scalars['String'],
};

/** All input for the `deletePrNote` mutation. */
export type DeletePrNoteInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The globally unique `ID` which will identify a single `PrNote` to be deleted. */
  nodeId: Scalars['ID'],
};

/** The output of our delete `PrNote` mutation. */
export type DeletePrNotePayload = {
   __typename?: 'DeletePrNotePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `PrNote` that was deleted by this mutation. */
  prNote?: Maybe<PrNote>,
  deletedPrNoteId?: Maybe<Scalars['ID']>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `PrNote`. May be used by Relay 1. */
  prNoteEdge?: Maybe<PrNotesEdge>,
};


/** The output of our delete `PrNote` mutation. */
export type DeletePrNotePayloadPrNoteEdgeArgs = {
  orderBy?: Maybe<Array<PrNotesOrderBy>>
};


/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
   __typename?: 'Mutation',
  /** Creates a single `Person`. */
  createPerson?: Maybe<CreatePersonPayload>,
  /** Creates a single `PrNote`. */
  createPrNote?: Maybe<CreatePrNotePayload>,
  /** Updates a single `Person` using its globally unique id and a patch. */
  updatePerson?: Maybe<UpdatePersonPayload>,
  /** Updates a single `Person` using a unique key and a patch. */
  updatePersonById?: Maybe<UpdatePersonPayload>,
  /** Updates a single `PrNote` using its globally unique id and a patch. */
  updatePrNote?: Maybe<UpdatePrNotePayload>,
  /** Updates a single `PrNote` using a unique key and a patch. */
  updatePrNoteByPullRequest?: Maybe<UpdatePrNotePayload>,
  /** Deletes a single `Person` using its globally unique id. */
  deletePerson?: Maybe<DeletePersonPayload>,
  /** Deletes a single `Person` using a unique key. */
  deletePersonById?: Maybe<DeletePersonPayload>,
  /** Deletes a single `PrNote` using its globally unique id. */
  deletePrNote?: Maybe<DeletePrNotePayload>,
  /** Deletes a single `PrNote` using a unique key. */
  deletePrNoteByPullRequest?: Maybe<DeletePrNotePayload>,
  /** Creates a JWT token that will securely identify a person and give them certain permissions. */
  authenticate?: Maybe<AuthenticatePayload>,
  /** Registers a single user and creates an account in our site. */
  registerPerson?: Maybe<RegisterPersonPayload>,
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePersonArgs = {
  input: CreatePersonInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePrNoteArgs = {
  input: CreatePrNoteInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePersonByIdArgs = {
  input: UpdatePersonByIdInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePrNoteArgs = {
  input: UpdatePrNoteInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePrNoteByPullRequestArgs = {
  input: UpdatePrNoteByPullRequestInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePersonArgs = {
  input: DeletePersonInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePersonByIdArgs = {
  input: DeletePersonByIdInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePrNoteArgs = {
  input: DeletePrNoteInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePrNoteByPullRequestArgs = {
  input: DeletePrNoteByPullRequestInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterPersonArgs = {
  input: RegisterPersonInput
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'],
};

/** Information about pagination in a connection. */
export type PageInfo = {
   __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>,
};

/** A connection to a list of `Person` values. */
export type PeopleConnection = {
   __typename?: 'PeopleConnection',
  /** A list of `Person` objects. */
  nodes: Array<Maybe<Person>>,
  /** A list of edges which contains the `Person` and cursor to aid in pagination. */
  edges: Array<PeopleEdge>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `Person` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `Person` edge in the connection. */
export type PeopleEdge = {
   __typename?: 'PeopleEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `Person` at the end of the edge. */
  node?: Maybe<Person>,
};

/** Methods to use when ordering `Person`. */
export enum PeopleOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  GithubAuthAsc = 'GITHUB_AUTH_ASC',
  GithubAuthDesc = 'GITHUB_AUTH_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A user of the site. */
export type Person = Node & {
   __typename?: 'Person',
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'],
  /** The primary unique identifier for the person. */
  id: Scalars['Int'],
  /** The person’s first name. */
  firstName: Scalars['String'],
  /** The person’s last name. */
  lastName?: Maybe<Scalars['String']>,
  githubAuth?: Maybe<Scalars['String']>,
  /** The time this person was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** A person’s full name which is a concatenation of their first and last name. */
  fullName?: Maybe<Scalars['String']>,
};

/** A condition to be used against `Person` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PersonCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>,
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `githubAuth` field. */
  githubAuth?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** An input for mutations affecting `Person` */
export type PersonInput = {
  /** The primary unique identifier for the person. */
  id?: Maybe<Scalars['Int']>,
  /** The person’s first name. */
  firstName: Scalars['String'],
  /** The person’s last name. */
  lastName?: Maybe<Scalars['String']>,
  githubAuth?: Maybe<Scalars['String']>,
  /** The time this person was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** Represents an update to a `Person`. Fields that are set will be updated. */
export type PersonPatch = {
  /** The primary unique identifier for the person. */
  id?: Maybe<Scalars['Int']>,
  /** The person’s first name. */
  firstName?: Maybe<Scalars['String']>,
  /** The person’s last name. */
  lastName?: Maybe<Scalars['String']>,
  githubAuth?: Maybe<Scalars['String']>,
  /** The time this person was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** Notes on a pull request. */
export type PrNote = Node & {
   __typename?: 'PrNote',
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'],
  /** The pr_notes key and pull request uuid in Github. */
  pullRequest: Scalars['String'],
  /** The pr_notes content. */
  content: Scalars['String'],
  /** The time this pr_note was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** A condition to be used against `PrNote` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PrNoteCondition = {
  /** Checks for equality with the object’s `pullRequest` field. */
  pullRequest?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `content` field. */
  content?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** An input for mutations affecting `PrNote` */
export type PrNoteInput = {
  /** The pr_notes key and pull request uuid in Github. */
  pullRequest: Scalars['String'],
  /** The pr_notes content. */
  content: Scalars['String'],
  /** The time this pr_note was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** Represents an update to a `PrNote`. Fields that are set will be updated. */
export type PrNotePatch = {
  /** The pr_notes key and pull request uuid in Github. */
  pullRequest?: Maybe<Scalars['String']>,
  /** The pr_notes content. */
  content?: Maybe<Scalars['String']>,
  /** The time this pr_note was created. */
  createdAt?: Maybe<Scalars['Datetime']>,
};

/** A connection to a list of `PrNote` values. */
export type PrNotesConnection = {
   __typename?: 'PrNotesConnection',
  /** A list of `PrNote` objects. */
  nodes: Array<Maybe<PrNote>>,
  /** A list of edges which contains the `PrNote` and cursor to aid in pagination. */
  edges: Array<PrNotesEdge>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `PrNote` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `PrNote` edge in the connection. */
export type PrNotesEdge = {
   __typename?: 'PrNotesEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `PrNote` at the end of the edge. */
  node?: Maybe<PrNote>,
};

/** Methods to use when ordering `PrNote`. */
export enum PrNotesOrderBy {
  Natural = 'NATURAL',
  PullRequestAsc = 'PULL_REQUEST_ASC',
  PullRequestDesc = 'PULL_REQUEST_DESC',
  ContentAsc = 'CONTENT_ASC',
  ContentDesc = 'CONTENT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
   __typename?: 'Query',
  /** 
 * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
 */
  query: Query,
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'],
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>,
  /** Reads and enables pagination through a set of `Person`. */
  allPeople?: Maybe<PeopleConnection>,
  /** Reads and enables pagination through a set of `PrNote`. */
  allPrNotes?: Maybe<PrNotesConnection>,
  personById?: Maybe<Person>,
  prNoteByPullRequest?: Maybe<PrNote>,
  /** Gets the person who was identified by our JWT. */
  currentPerson?: Maybe<Person>,
  /** Reads a single `Person` using its globally unique `ID`. */
  person?: Maybe<Person>,
  /** Reads a single `PrNote` using its globally unique `ID`. */
  prNote?: Maybe<PrNote>,
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPeopleArgs = {
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Cursor']>,
  after?: Maybe<Scalars['Cursor']>,
  orderBy?: Maybe<Array<PeopleOrderBy>>,
  condition?: Maybe<PersonCondition>
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPrNotesArgs = {
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Cursor']>,
  after?: Maybe<Scalars['Cursor']>,
  orderBy?: Maybe<Array<PrNotesOrderBy>>,
  condition?: Maybe<PrNoteCondition>
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonByIdArgs = {
  id: Scalars['Int']
};


/** The root query type which gives access points into the data universe. */
export type QueryPrNoteByPullRequestArgs = {
  pullRequest: Scalars['String']
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonArgs = {
  nodeId: Scalars['ID']
};


/** The root query type which gives access points into the data universe. */
export type QueryPrNoteArgs = {
  nodeId: Scalars['ID']
};

/** All input for the `registerPerson` mutation. */
export type RegisterPersonInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

/** The output of our `registerPerson` mutation. */
export type RegisterPersonPayload = {
   __typename?: 'RegisterPersonPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  person?: Maybe<Person>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>,
};


/** The output of our `registerPerson` mutation. */
export type RegisterPersonPayloadPersonEdgeArgs = {
  orderBy?: Maybe<Array<PeopleOrderBy>>
};

/** All input for the `updatePersonById` mutation. */
export type UpdatePersonByIdInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** An object where the defined keys will be set on the `Person` being updated. */
  personPatch: PersonPatch,
  /** The primary unique identifier for the person. */
  id: Scalars['Int'],
};

/** All input for the `updatePerson` mutation. */
export type UpdatePersonInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The globally unique `ID` which will identify a single `Person` to be updated. */
  nodeId: Scalars['ID'],
  /** An object where the defined keys will be set on the `Person` being updated. */
  personPatch: PersonPatch,
};

/** The output of our update `Person` mutation. */
export type UpdatePersonPayload = {
   __typename?: 'UpdatePersonPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Person` that was updated by this mutation. */
  person?: Maybe<Person>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `Person`. May be used by Relay 1. */
  personEdge?: Maybe<PeopleEdge>,
};


/** The output of our update `Person` mutation. */
export type UpdatePersonPayloadPersonEdgeArgs = {
  orderBy?: Maybe<Array<PeopleOrderBy>>
};

/** All input for the `updatePrNoteByPullRequest` mutation. */
export type UpdatePrNoteByPullRequestInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** An object where the defined keys will be set on the `PrNote` being updated. */
  prNotePatch: PrNotePatch,
  /** The pr_notes key and pull request uuid in Github. */
  pullRequest: Scalars['String'],
};

/** All input for the `updatePrNote` mutation. */
export type UpdatePrNoteInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The globally unique `ID` which will identify a single `PrNote` to be updated. */
  nodeId: Scalars['ID'],
  /** An object where the defined keys will be set on the `PrNote` being updated. */
  prNotePatch: PrNotePatch,
};

/** The output of our update `PrNote` mutation. */
export type UpdatePrNotePayload = {
   __typename?: 'UpdatePrNotePayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `PrNote` that was updated by this mutation. */
  prNote?: Maybe<PrNote>,
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>,
  /** An edge for our `PrNote`. May be used by Relay 1. */
  prNoteEdge?: Maybe<PrNotesEdge>,
};


/** The output of our update `PrNote` mutation. */
export type UpdatePrNotePayloadPrNoteEdgeArgs = {
  orderBy?: Maybe<Array<PrNotesOrderBy>>
};
