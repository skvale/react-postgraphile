import React from 'react'
import { cx } from 'emotion'

export const Link: React.FC<React.AnchorHTMLAttributes<
  HTMLAnchorElement
>> = props => {
  const linkClasses = cx(
    'cursor-pointer',
    'font-bold',
    'inline-block',
    'align-baseline',
    'text-sm',
    'text-blue-700',
    'hover:text-blue-900',
    props.className
  )
  return (
    <a {...props} className={linkClasses}>
      {props.children}
    </a>
  )
}
