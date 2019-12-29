import React from 'react'
import { cx } from 'emotion'

type TextAreaProps = {
  label?: React.ReactNode
  meta?: {
    error?: boolean
    touched?: boolean
  }
}
export const TextArea: React.FC<TextAreaProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  label,
  className,
  meta,
  ...textAreaProps
}) => {
  const textAreaClasses = cx(
    'appearance-none',
    'border',
    meta && meta.error && meta.touched && 'border-red-600',
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
    <div className={cx('mb-4', className)}>
      {label && (
        <label className={labelClasses} htmlFor={textAreaProps.id}>
          {label}
        </label>
      )}
      <textarea {...textAreaProps} className={textAreaClasses} />
      {meta && meta.error && meta.touched && (
        <p className='text-red-600 text-xs italic'>{meta.error}</p>
      )}
    </div>
  )
}
