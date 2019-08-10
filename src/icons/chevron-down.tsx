import React from 'react'
import { cx } from 'emotion'

export const ChevronDown: React.FC<any> = ({ className, ...rest }) => {
  const classes = ['fill-current', className]
  return (
    <svg className={cx(classes)} viewBox='0 0 20 20' {...rest}>
      <g stroke='none' strokeWidth='1' fillRule='evenodd'>
        <g>
          <polygon points='9.29289322 12.9497475 10 13.6568542 15.6568542 8 14.2426407 6.58578644 10 10.8284271 5.75735931 6.58578644 4.34314575 8' />
        </g>
      </g>
    </svg>
  )
}
