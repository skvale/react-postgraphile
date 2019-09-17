import React from 'react'
import { useMachine } from '@xstate/react'
import { print } from 'graphql'
import Cookies from 'js-cookie'
import { useQueryParam, BooleanParam } from 'use-query-params'
import { loader } from 'graphql.macro'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Form } from '../components/form'
import { Person } from '../schema'
import { Link } from '../components/link'
import { Card } from '../components/card'
import {
  loginMachine,
  registerMachine,
  LoginContext
} from '../machines/login-machine'
import { createClient } from '../clients/postgraphile'

const registerPersonMutation = loader('./graphql/register-person-mutation.gql')
const authenticateMutation = loader('./graphql/authenticate-mutation.gql')

const login = (...args: any[]) =>
  createClient()(print(authenticateMutation))(...args)
const register = (...args: any[]) =>
  createClient()(print(registerPersonMutation))(...args)

export type LoginFormProps = {
  currentUser?: Person | null
  updateToken: (jwtToken: string) => void
}

enum ViewState {
  LOGIN = 'login',
  REGISTER = 'register'
}

export const LoginForm: React.FC<LoginFormProps> = ({
  currentUser,
  updateToken
}) => {
  const [registerParam] = useQueryParam('register', BooleanParam)

  const [current, send] = useMachine(
    registerParam ? registerMachine : loginMachine,
    {
      services: {
        onLogin: async ({ email, password }: LoginContext) => {
          const result = await login({
            email,
            password
          })
          console.log(result.authenticate)
          if (result && result.authenticate && result.authenticate.jwtToken) {
            Cookies.set('postgraphile-jwt', result.authenticate.jwtToken)
            updateToken(result.authenticate.jwtToken)
            return result.authenticate.jwtToken
          } else {
            throw Error('something happened')
          }
        },
        onRegister: async ({
          email,
          password,
          firstName,
          lastName
        }: LoginContext) => {
          return register({
            email,
            firstName,
            lastName,
            password
          })
        }
      }
    }
  ) as any

  const { error, firstName, email, lastName, password } = current.context

  if (current.matches('success')) {
    return null
  }

  const onSwapState = () => {
    send('TOGGLE')
  }

  return (
    <div className='flex justify-center'>
      {currentUser && <div>Currently logged in as: {currentUser.fullName}</div>}
      <Card
        className='bg-white'
        title={current.matches(ViewState.LOGIN) ? 'Login' : 'Register'}
      >
        <div className='float-right'>
          {current.matches(ViewState.LOGIN) ? (
            <Link data-testid='toggle-link' color='gray' onClick={onSwapState}>
              Register
            </Link>
          ) : (
            <Link data-testid='toggle-link' color='gray' onClick={onSwapState}>
              Login
            </Link>
          )}
        </div>
        <Form
          data-testid='login-form'
          error={error}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            send({
              type: 'SUBMIT'
            })
          }}
        >
          <div className='mb-6'>
            <Input
              data-testid='login-email'
              id='email'
              label='Email'
              onChange={e => send({ type: 'EMAIL', value: e.target.value })}
              value={email}
            />
            <Input
              data-testid='login-password'
              id='password'
              label='Password'
              type='password'
              onChange={e => send({ type: 'PASSWORD', value: e.target.value })}
              value={password}
            />
            {current.matches(ViewState.REGISTER) && (
              <React.Fragment>
                <Input
                  data-testid='login-first-name'
                  id='firstName'
                  label='First Name'
                  onChange={e =>
                    send({ type: 'FIRST_NAME', value: e.target.value })
                  }
                  value={firstName}
                />
                <Input
                  data-testid='login-last-name'
                  id='lastName'
                  label='Last Name'
                  onChange={e =>
                    send({ type: 'LAST_NAME', value: e.target.value })
                  }
                  value={lastName}
                />
              </React.Fragment>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <Button data-testid='login-submit-button' type='submit'>
              {current.matches(ViewState.LOGIN) ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
