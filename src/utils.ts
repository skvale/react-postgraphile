import { DependencyList, useEffect } from 'react'

export function useAsyncEffect(
  effect: (signal: {
    readonly aborted: boolean
  }) => Promise<void | (() => void)>,
  deps?: DependencyList
) {
  useEffect(() => {
    const signal = { aborted: false }
    let cleanup: () => void
    effect(signal).then(cb => {
      if (cb && !signal.aborted) cleanup = cb
    })
    return () => {
      if (cleanup) cleanup()
      signal.aborted = true
    }
  }, deps) // eslint-disable-line
}
