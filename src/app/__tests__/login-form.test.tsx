import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LoginForm, LoginFormProps } from '../login-form'
import * as graph from '../../clients/postgraphile'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

let defaultProps: LoginFormProps
beforeEach(() => {
  defaultProps = {
    updateToken: jest.fn()
  }
})

test('renders', async () => {
  const { asFragment } = render(<LoginForm {...defaultProps} />)
  expect(asFragment()).toMatchSnapshot()
})

test('click login', async () => {
  const login = jest.fn(() =>
    Promise.resolve({ authenticate: { jwtToken: 'mock-jwt-token' } })
  )
  // @ts-ignore
  graph.createClient = () => () => login
  const { findByTestId } = render(<LoginForm {...defaultProps} />)
  const email = await findByTestId('login-email')
  const password = await findByTestId('login-password')
  fireEvent.change(email, { target: { value: 'foo@bar.com' } })
  fireEvent.change(password, { target: { value: 'password' } })
  const form = await findByTestId('login-form')
  fireEvent.submit(form)
  expect(login).toBeCalledTimes(1)
  expect(login.mock.calls[0]).toMatchSnapshot()
  await flushPromises()
  expect(defaultProps.updateToken).toHaveBeenCalledWith('mock-jwt-token')
})

test('renders registration view', async () => {
  const { asFragment, findByText } = render(<LoginForm {...defaultProps} />)
  const registerLink = await findByText('Register')
  fireEvent.click(registerLink)
  expect(asFragment()).toMatchSnapshot()
})

test('click register', async () => {
  const register = jest.fn()
  // @ts-ignore
  graph.createClient = () => () => register
  const { findByTestId } = render(<LoginForm {...defaultProps} />)
  const registerLink = await findByTestId('toggle-link')
  fireEvent.click(registerLink)
  const email = await findByTestId('login-email')
  const password = await findByTestId('login-password')
  const firstName = await findByTestId('login-first-name')
  const lastName = await findByTestId('login-last-name')
  fireEvent.change(email, { target: { value: 'foo@bar.com' } })
  fireEvent.change(password, { target: { value: 'password' } })
  fireEvent.change(firstName, { target: { value: 'First' } })
  fireEvent.change(lastName, { target: { value: 'Last' } })
  const form = await findByTestId('login-form')
  fireEvent.submit(form)
  expect(register).toBeCalledTimes(1)
  expect(register.mock.calls[0][0]).toMatchSnapshot()
})
