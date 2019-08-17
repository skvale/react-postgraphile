import React from 'react'
import { cx } from 'emotion'

type Tag = string

type CardProps = {
  children: React.ReactNode
  className?: string
  img?: React.ReactElement<HTMLImageElement>
  title: React.ReactNode
  tags?: Array<Tag>
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  img,
  tags = [],
  title
}) => {
  const tagClasses = cx(
    'inline-block',
    'bg-gray-300',
    'rounded-full',
    'px-3',
    'py-1',
    'text-sm',
    'font-semibold',
    'text-gray-700'
  )
  return (
    <div
      className={cx('max-w-sm rounded overflow-hidden shadow-lg', className)}
    >
      {img}
      <div className='p-6'>
        <div className='font-bold text-xl mb-2'>{title}</div>
        <div className='text-gray-700 text-base'>{children}</div>
      </div>
      {tags.length > 0 && (
        <div className='px-6 py-4'>
          {tags.map((tag, index) => {
            return (
              <span
                key={tag}
                className={cx(tagClasses, index < tags.length - 1 && ' mr-2')}
              >
                {tag}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
