import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render } from '@testing-library/react'
import * as apolloHooks from '@apollo/react-hooks'
import { App, AppProps } from '../app'
import { LoginFormProps } from '../login-form'

jest.mock('@apollo/react-hooks', () => ({
  useQuery: jest.fn(() => ({})),
  useMutation: jest.fn(() => [jest.fn(), {}])
}))

jest.mock('../login-form', () => ({
  LoginForm: (props: LoginFormProps) => `LoginForm ${JSON.stringify(props)}`
}))

jest.mock('roughjs/dist/rough.umd', () => ({
  svg: () => ({
    rectangle: () => document.createElement('svg')
  })
}))

let defaultProps: AppProps
beforeEach(() => {
  defaultProps = {
    updateToken: jest.fn()
  }
})

test('renders without user', () => {
  // @ts-ignore
  apolloHooks.useQuery.mockImplementationOnce(() => ({
    data: {
      currentPerson: null
    }
  }))
  const { asFragment } = render(<App {...defaultProps} />)

  expect(
    // @ts-ignore
    apolloHooks.useQuery.mock.calls[0][0].loc.source.body
  ).toMatchSnapshot()
  expect(asFragment()).toMatchSnapshot()
})

test('renders with user', () => {
  // @ts-ignore
  apolloHooks.useQuery.mockImplementationOnce(() => ({
    data: {
      currentPerson: {
        fullName: 'Bobby'
      }
    }
  }))
  const { asFragment } = render(<App {...defaultProps} />)

  expect(asFragment()).toMatchSnapshot()
})

test('renders loading', () => {
  // @ts-ignore
  apolloHooks.useQuery.mockImplementationOnce(() => ({
    loading: true
  }))
  const { asFragment } = render(<App {...defaultProps} />)

  expect(asFragment()).toMatchSnapshot()
})

test('renders error', () => {
  // @ts-ignore
  apolloHooks.useQuery.mockImplementationOnce(() => ({
    error: new Error('bad stuff')
  }))
  const { asFragment } = render(<App {...defaultProps} />)

  expect(asFragment()).toMatchSnapshot()
})
