import { useState, useEffect } from 'react'
import { isBrowser } from '@fragments/utils'

export interface UseLocalStorageValueOptions {
  sync?: boolean
}

const hasLocalStorage = isBrowser && typeof window?.localStorage !== 'undefined'

export const useLocalStorageValue = <T>(key: string, initialValue: T, options?: UseLocalStorageValueOptions) => {
  const sync = options?.sync ?? false

  const [value, setValue] = useState<T>(() => {
    const storedValue = hasLocalStorage ? localStorage.getItem(key) : null
    return storedValue && storedValue !== 'null' ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  useEffect(() => {
    if (sync) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          setValue(JSON.parse(event.newValue) ?? initialValue)
        }
      }

      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, sync])

  return [value, setValue] as const
}
