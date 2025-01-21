import { useState, useEffect } from 'react'
import { isBrowser } from '@fragments/utils'

export interface UseLocalStorageValueOptions {
  sync?: boolean
}

const hasLocalStorage = isBrowser && typeof window?.localStorage !== 'undefined'

export const useLocalStorageValue = (key: string, initialValue: any, options?: UseLocalStorageValueOptions) => {
  const sync = options?.sync ?? false

  const [value, setValue] = useState(() => {
    const storedValue = hasLocalStorage ? localStorage.getItem(key) : null
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  useEffect(() => {
    if (sync) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          setValue(event.newValue)
        }
      }

      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, sync])

  return [value, setValue]
}
