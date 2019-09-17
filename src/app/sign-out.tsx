import React, { useEffect } from 'react'
import { navigate } from 'hookrouter'
import Cookies from 'js-cookie'

export type SignOutProps = {
  updateToken: (jwtToken: string) => void
}

export const SignOut: React.FC<SignOutProps> = ({ updateToken }) => {
  useEffect(() => {
    updateToken('')
    Cookies.remove('postgraphile-jwt')
    navigate('/')
  }, [updateToken])

  return <div></div>
}
