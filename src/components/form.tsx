import React from 'react'
import { cx } from 'emotion'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string
}

export const Form: React.FC<FormProps> = ({
  className,
  children,
  error,
  onSubmit,
  ...props
}) => {
  const formClasses = cx('bg-white', 'pt-6', 'pb-4', className)
  return (
    <form
      {...props}
      className={formClasses}
      onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onSubmit) {
          onSubmit(e)
        }
      }}
    >
      {children}
      {error && <div>{error}</div>}
    </form>
  )
}
