import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
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
import { error } from '../logger'
const registerPersonMutation = loader('./graphql/register-person-mutation.gql')
const authenticateMutation = loader('./graphql/authenticate-mutation.gql')

export type LoginFormProps = {
  currentPerson?: Person | null
  updateToken: (jwtToken: string) => void
}

enum ViewState {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export const LoginForm: React.FC<LoginFormProps> = ({
  currentPerson,
  updateToken
}) => {
  const [, setLocation] = useLocation()
  const [registerParam] = useQueryParam('register', BooleanParam)
  const [viewState, setViewState] = useState<ViewState>(
    registerParam ? ViewState.REGISTER : ViewState.LOGIN
  )
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
      setLocation('/')
    }
  }, [authenticateData, setLocation, updateToken])

  const onSwapState = () => {
    setViewState(
      viewState === ViewState.LOGIN ? ViewState.REGISTER : ViewState.LOGIN
    )
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
      {currentPerson && (
        <div>Currently logged in as: {currentPerson.fullName}</div>
      )}
      <Card
        className='bg-white'
        title={viewState === ViewState.LOGIN ? 'Login' : 'Register'}
      >
        <div className='float-right'>
          {viewState === ViewState.LOGIN ? (
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
            if (viewState === ViewState.LOGIN) {
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
            {viewState === ViewState.REGISTER && (
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
              {viewState === ViewState.LOGIN ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
