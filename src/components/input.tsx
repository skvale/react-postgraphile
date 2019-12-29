import React from 'react'
import { cx } from 'emotion'

type InputProps = {
  label?: React.ReactNode
  meta?: {
    error?: boolean
    touched?: boolean
  }
}
export const Input: React.FC<InputProps &
  React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  meta = {},
  ...props
}) => {
  const inputClasses = cx(
    'appearance-none',
    'border',
    meta.error && meta.touched && 'border-red-600',
    'leading-tight',
    'py-2',
    'px-3',
    'rounded',
    'shadow',
    'text-gray-700',
    'w-full',
    'focus:outline-none',
    'focus:shadow-outline'
  )
  const labelClasses = cx(
    'block',
    'text-gray-700',
    'text-sm',
    'font-bold',
    'mb-2'
  )
  return (
    <div className={cx('mb-4', props.className)}>
      {label && (
        <label className={labelClasses} htmlFor={props.id}>
          {label}
        </label>
      )}
      <input {...props} className={inputClasses} />
      {meta.error && meta.touched && (
        <p className='text-red-600 text-xs italic'>{meta.error}</p>
      )}
    </div>
  )
}
