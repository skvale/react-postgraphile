import React, { useState, useEffect, useRef } from 'react'
import rough from 'roughjs/dist/rough.umd'
import { Person } from '../schema'

export type NavProps = {
  currentUser?: Person | null
}

export const Nav: React.FC<NavProps> = ({ currentUser }) => {
  const [showPullout, setShowPullout] = useState(false)
  const svgEl = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (svgEl && svgEl.current) {
      const rc = rough.svg(svgEl.current)
      let node = rc.rectangle(10, 10, 40, 40, {
        fill: 'blue'
      })
      svgEl.current.appendChild(node)
    }
  })

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between'>
          <div>
            <a href='/'>
              <svg ref={svgEl} className='h-10 w-10' viewBox='0 0 55 55' />
            </a>
          </div>
          <div className='hidden sm:flex sm:items-center'>
            <a
              href='/products'
              className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'
            >
              Products
            </a>
            {currentUser ? (
              <a
                href='/sign-out'
                className='bg-gray-900 text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-gray-200 hover:border-blue-600'
              >
                Sign out
              </a>
            ) : (
              <React.Fragment>
                <a
                  data-testid='signin-link'
                  href='/login'
                  className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'
                >
                  Sign in
                </a>
                <a
                  href='/login?register=1'
                  className='bg-gray-900 text-white text-sm font-semibold border px-4 py-2 rounded-lg hover:text-gray-200 hover:border-blue-600'
                >
                  Sign up
                </a>
              </React.Fragment>
            )}
          </div>

          <div
            className='sm:hidden cursor-pointer'
            onClick={() => setShowPullout(!showPullout)}
          >
            <svg className='w-6 h-6 text-purple-600' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z'
              />
            </svg>
          </div>
        </div>

        <div
          className={`block sm:hidden bg-white border-t-2 py-2${
            showPullout ? ' hidden' : ''
          }`}
        >
          <div className='flex flex-col'>
            <a
              href='/products'
              className='text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1'
            >
              Products
            </a>
            <div className='flex justify-between items-center border-t-2 pt-2'>
              {currentUser ? (
                <a
                  href='/sign-out'
                  className='text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600'
                >
                  Sign out
                </a>
              ) : (
                <React.Fragment>
                  <a
                    data-testid='signin-link'
                    href='/login'
                    className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'
                  >
                    Sign in
                  </a>
                  <a
                    href='/login?register=true'
                    className='text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600'
                  >
                    Sign up
                  </a>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
