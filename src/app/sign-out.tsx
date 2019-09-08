import React, { useEffect } from 'react'
import { useLocation } from 'wouter'

export type SignOutProps = {
  updateToken: (jwtToken: string) => void
}

export const SignOut: React.FC<SignOutProps> = ({ updateToken }) => {
  const [, setLocation] = useLocation()

  useEffect(() => {
    updateToken('')
    setLocation('/')
  })

  return <div></div>
}
