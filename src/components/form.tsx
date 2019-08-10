import React from 'react'
import { cx } from 'emotion'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = ({
  className,
  children,
  onSubmit,
  ...props
}) => {
  const formClasses = cx('bg-white', 'pt-6', 'pb-8', 'mb-4', className)
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
    </form>
  )
}
