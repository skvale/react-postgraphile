import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import * as apolloHooks from '@apollo/react-hooks'
import { LoginForm, LoginFormProps } from '../login-form'

jest.mock('@apollo/react-hooks', () => ({
  useMutation: jest.fn(() => [jest.fn(), {}])
}))

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
  const login = jest.fn()
  // @ts-ignore
  apolloHooks.useMutation.mockImplementation(() => [
    login,
    { data: { authenticate: { jwtToken: 'mock-jwt-token' } } }
  ])
  const { findByTestId } = render(<LoginForm {...defaultProps} />)
  const email = await findByTestId('login-email')
  const password = await findByTestId('login-password')
  fireEvent.change(email, { target: { value: 'foo@bar.com' } })
  fireEvent.change(password, { target: { value: 'password' } })
  const form = await findByTestId('login-form')
  fireEvent.submit(form)
  expect(login).toBeCalledTimes(1)
  expect(login.mock.calls[0][0]).toMatchSnapshot()
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
  apolloHooks.useMutation.mockImplementation(() => [register, {}])
  const { findByTestId, findByText } = render(<LoginForm {...defaultProps} />)
  const registerLink = await findByText('Register')
  fireEvent.click(registerLink)
  const email = await findByTestId('login-email')
  const password = await findByTestId('login-password')
  const firstName = await findByTestId('login-firstName')
  const lastName = await findByTestId('login-lastName')
  fireEvent.change(email, { target: { value: 'foo@bar.com' } })
  fireEvent.change(password, { target: { value: 'password' } })
  fireEvent.change(firstName, { target: { value: 'First' } })
  fireEvent.change(lastName, { target: { value: 'Last' } })
  const form = await findByTestId('login-form')
  fireEvent.submit(form)
  expect(register).toBeCalledTimes(1)
  expect(register.mock.calls[0][0]).toMatchSnapshot()
})
