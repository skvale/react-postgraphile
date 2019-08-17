import React, { useEffect, useState } from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Form } from '../components/form'
import {
  AuthenticateInput,
  AuthenticatePayload,
  RegisterPersonPayload,
  RegisterPersonInput
} from '../schema'
import { Link } from '../components/link'
import { Card } from '../components/card'
import { error } from '../logger'
const registerPersonMutation = loader('./graphql/register-person-mutation.gql')
const authenticateMutation = loader('./graphql/authenticate-mutation.gql')

export type LoginFormProps = {
  updateToken: (jwtToken: string) => void
}

type ViewState = 'LOGIN' | 'REGISTER'

export const LoginForm: React.FC<LoginFormProps> = ({ updateToken }) => {
  const [viewState, setViewState] = useState<ViewState>('LOGIN')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [
    login,
    { data: authenticateData, error: authenticateMutationError }
  ] = useMutation<{ authenticate: AuthenticatePayload }, AuthenticateInput>(
    authenticateMutation
  )

  const [register, { error: registerPersonMutationError }] = useMutation<
    RegisterPersonPayload,
    RegisterPersonInput
  >(registerPersonMutation)

  useEffect(() => {
    if (authenticateData && authenticateData.authenticate) {
      updateToken(authenticateData.authenticate.jwtToken || '')
    }
  }, [authenticateData, updateToken])

  const onSwapState = () => {
    setViewState(viewState === 'LOGIN' ? 'REGISTER' : 'LOGIN')
  }

  const onLogin = () => {
    login({
      variables: {
        email,
        password
      }
    })
  }

  const onRegister = async () => {
    try {
      await register({
        variables: {
          email,
          firstName,
          lastName,
          password
        }
      })
      onLogin()
    } catch (e) {
      error(e.message)
      console.error(e)
    }
  }

  const errorMessage = authenticateMutationError
    ? authenticateMutationError.message
    : registerPersonMutationError
    ? registerPersonMutationError.message
    : undefined

  return (
    <div className='flex justify-center'>
      <Card title={viewState === 'LOGIN' ? 'Login' : 'Register'}>
        <div className='float-right'>
          {viewState === 'LOGIN' ? (
            <Link color='gray' onClick={onSwapState}>
              Register
            </Link>
          ) : (
            <Link color='gray' onClick={onSwapState}>
              Login
            </Link>
          )}
        </div>
        <Form
          data-testid='login-form'
          error={errorMessage}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            if (viewState === 'LOGIN') {
              onLogin()
            } else {
              onRegister()
            }
          }}
        >
          <div className='mb-6'>
            <Input
              data-testid='login-email'
              id='email'
              label='Email'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <Input
              data-testid='login-password'
              id='password'
              label='Password'
              type='password'
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {viewState === 'REGISTER' && (
              <React.Fragment>
                <Input
                  data-testid='login-firstName'
                  id='firstName'
                  label='First Name'
                  onChange={e => setFirstName(e.target.value)}
                  value={firstName}
                />
                <Input
                  data-testid='login-lastName'
                  id='lastName'
                  label='Last Name'
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
                />
              </React.Fragment>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <Button type='submit'>
              {viewState === 'LOGIN' ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}