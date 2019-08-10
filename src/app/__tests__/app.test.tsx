import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render } from '@testing-library/react'
import * as apolloHooks from '@apollo/react-hooks'
import { App } from '../app'

jest.mock('@apollo/react-hooks', () => ({
  useQuery: jest.fn(() => ({})),
  useMutation: jest.fn(() => [, {}])
}))

test('renders', () => {
  apolloHooks.useQuery.mockImplementationOnce(() => ({}))
  const updateToken = jest.fn()
  const { asFragment } = render(<App updateToken={updateToken} />)

  expect(
    apolloHooks.useQuery.mock.calls[0][0].loc.source.body
  ).toMatchSnapshot()
  expect(asFragment()).toMatchSnapshot()
})

test('renders error', () => {
  apolloHooks.useQuery.mockImplementationOnce(() => ({error: new Error('bad stuff')}))
  const updateToken = jest.fn()
  const { asFragment } = render(<App updateToken={updateToken} />)

  expect(asFragment()).toMatchSnapshot()
})
