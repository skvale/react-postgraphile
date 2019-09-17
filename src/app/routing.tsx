import React from 'react'
import { useRoutes } from 'hookrouter'

import { LoginForm } from './login-form'
import { Person } from '../schema'
import { SignOut } from './sign-out'

export type RoutingProps = {
  currentUser?: Person | null
  loading?: boolean
  updateToken: (jwtToken: string) => void
}

const routes = {
  '/login': () => 'login',
  '/sign-out': () => 'signOut'
}

export const Routing: React.FC<RoutingProps> = ({
  currentUser,
  loading,
  updateToken
}) => {
  const routeName = useRoutes(routes)

  if (routeName === 'login') {
    return <LoginForm currentUser={currentUser} updateToken={updateToken} />
  }

  if (routeName === 'signOut') {
    return <SignOut updateToken={updateToken} />
  }

  if (loading) {
    return <div>loading</div>
  }

  if (!currentUser) {
    return (
      <div>
        <div>Not logged in</div>
      </div>
    )
  }

  return (
    <div>
      <div>Hello: {currentUser.fullName}</div>
    </div>
  )
}
