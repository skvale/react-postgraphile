import React from 'react'
import { cx } from 'emotion'

type Color = 'blue' | 'gray'

export const Button: React.FC<{ color?: Color } & React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({ color = 'blue', ...props }) => {
  const colors = {
    blue: ['bg-blue-500', 'hover:bg-blue-700', 'text-white'],
    gray: ['bg-gray-300', 'hover:bg-gray-500']
  }

  const buttonClasses = cx(
    ...colors[color],
    'py-2',
    'px-4',
    'rounded',
    'focus:outline-none',
    'focus:shadow-outline',
    props.className
  )
  return <button {...props} className={buttonClasses} />
}
