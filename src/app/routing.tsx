import React from 'react'
import { useRoute } from 'wouter'

import { LoginForm } from './login-form'
import { Person } from '../schema'
import { SignOut } from './sign-out'

export type RoutingProps = {
  currentPerson?: Person | null
  loading?: boolean
  updateToken: (jwtToken: string) => void
}

export const Routing: React.FC<RoutingProps> = ({
  currentPerson,
  loading,
  updateToken
}) => {
  const [loginRoute] = useRoute('/login')
  const [signOutRoute] = useRoute('/sign-out')
  if (loginRoute) {
    return <LoginForm currentPerson={currentPerson} updateToken={updateToken} />
  }

  if (signOutRoute) {
    return <SignOut updateToken={updateToken} />
  }

  if (loading) {
    return <div>loading</div>
  }

  if (!currentPerson) {
    return (
      <div>
        <div>Not logged in</div>
      </div>
    )
  }

  return (
    <div>
      <div>Hello: {currentPerson.fullName}</div>
    </div>
  )
}
