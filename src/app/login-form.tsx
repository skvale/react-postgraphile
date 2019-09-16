import React from 'react'
import { useMachine } from '@xstate/react'
import { useQueryParam, BooleanParam } from 'use-query-params'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Form } from '../components/form'
import {
  AuthenticateInput,
  AuthenticatePayload,
  RegisterPersonPayload,
  RegisterPersonInput,
  Person
} from '../schema'
import { Link } from '../components/link'
import { Card } from '../components/card'
import {
  loginMachine,
  registerMachine,
  LoginContext
} from '../machines/login-machine'
const registerPersonMutation = loader('./graphql/register-person-mutation.gql')
const authenticateMutation = loader('./graphql/authenticate-mutation.gql')

export type LoginFormProps = {
  currentPerson?: Person | null
  updateToken: (jwtToken: string) => void
}

enum ViewState {
  LOGIN = 'login',
  REGISTER = 'register'
}

export const LoginForm: React.FC<LoginFormProps> = ({
  currentPerson,
  updateToken
}) => {
  const [registerParam] = useQueryParam('register', BooleanParam)
  const [login] = useMutation<
    { authenticate: AuthenticatePayload },
    AuthenticateInput
  >(authenticateMutation)

  const [register] = useMutation<RegisterPersonPayload, RegisterPersonInput>(
    registerPersonMutation
  )

  const [current, send] = useMachine(
    registerParam ? registerMachine : loginMachine,
    {
      services: {
        onLogin: async ({ email, password }: LoginContext) => {
          const result = await login({
            variables: {
              email,
              password
            }
          })
          console.log('Here', result)
          if (
            result &&
            result.data &&
            result.data.authenticate &&
            result.data.authenticate.jwtToken
          ) {
            console.log('calling', result.data.authenticate.jwtToken)
            updateToken(result.data.authenticate.jwtToken)
            return result.data.authenticate.jwtToken
          } else {
            console.log('Error')
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
            variables: {
              email,
              firstName,
              lastName,
              password
            }
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
      {currentPerson && (
        <div>Currently logged in as: {currentPerson.fullName}</div>
      )}
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
