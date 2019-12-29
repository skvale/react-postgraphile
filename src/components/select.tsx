import React from 'react'
import { cx } from 'emotion'
import { ChevronDown } from '../icons/chevron-down'

type Option = {
  key: string
  value: string
}
type SelectProps = {
  label?: string
  options?: Array<Option>
  upperCase?: boolean
}

export const Select: React.FC<SelectProps &
  React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  label,
  className,
  options = [],
  upperCase,
  ...selectProps
}) => {
  const labelClasses = cx(
    'block',
    upperCase && 'uppercase tracking-wide',
    'text-gray-700',
    'text-sm',
    'font-bold',
    'mb-2'
  )
  const selectClasses = cx(
    'block',
    'appearance-none',
    'w-full',
    'bg-gray-200',
    'border',
    'border-gray-200',
    'text-gray-600',
    'py-3',
    'px-4',
    'pr-8',
    'rounded',
    'leading-tight',
    'focus:outline-none',
    'focus:bg-white',
    'focus:border-gray-500'
  )
  return (
    <div className={cx(`w-full`, 'mb-4', className)}>
      {label && (
        <label className={labelClasses} htmlFor={selectProps.id}>
          {label}
        </label>
      )}
      <div className='relative'>
        <select className={selectClasses} {...selectProps}>
          {options.map(option => (
            <option key={option.key}>{option.value}</option>
          ))}
        </select>
        <div className='pointer-events-none absolute pin-y pin-r flex items-center px-2 text-gray-700 top-0 right-0 bottom-0'>
          <ChevronDown className='h-4 w-4' />
        </div>
      </div>
    </div>
  )
}
