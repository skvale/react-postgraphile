import React, { useEffect } from 'react'
import { navigate } from 'hookrouter'

export type SignOutProps = {
  updateToken: (jwtToken: string) => void
}

export const SignOut: React.FC<SignOutProps> = ({ updateToken }) => {
  useEffect(() => {
    updateToken('')
    navigate('/')
  }, [updateToken])

  return <div></div>
}
