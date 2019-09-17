import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../app'
import { LoginFormProps } from '../login-form'
import rough from 'roughjs/dist/rough.umd'
import * as graph from '../../clients/postgraphile'

rough.svg = jest.fn(() => ({ rectangle: () => document.createElement('svg') }))

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

jest.mock('../login-form', () => ({
  LoginForm: (props: LoginFormProps) => `LoginForm ${JSON.stringify(props)}`
}))

test('renders without user', async () => {
  const m = jest.fn(() => Promise.resolve({ currentPerson: null }))
  const f = jest.fn(() => m)
  // @ts-ignore
  graph.createClient = () => f
  const { asFragment } = render(<App />)
  await flushPromises()

  expect(m).toHaveBeenCalled()
  expect(f.mock.calls[0]).toMatchSnapshot()
  expect(asFragment()).toMatchSnapshot()
})

test('renders with user', async () => {
  const m = jest.fn(() =>
    Promise.resolve({ currentPerson: { fullName: 'Bobby' } })
  )
  const f = jest.fn(() => m)
  // @ts-ignore
  graph.createClient = () => f
  const { asFragment } = render(<App />)
  await flushPromises()
  expect(asFragment()).toMatchSnapshot()
})

test('renders loading', () => {
  const m = jest.fn(() =>
    Promise.resolve({ currentPerson: { fullName: 'Bobby' } })
  )
  const f = jest.fn(() => m)
  // @ts-ignore
  graph.createClient = () => f
  const { asFragment } = render(<App />)
  expect(asFragment()).toMatchSnapshot()
})

test('renders error', async () => {
  const m = jest.fn(() => Promise.reject(Error('bad stuff')))
  const f = jest.fn(() => m)
  // @ts-ignore
  graph.createClient = () => f
  const { asFragment, rerender } = render(<App />)
  await flushPromises()
  rerender(<App />)

  expect(asFragment()).toMatchSnapshot()
})
