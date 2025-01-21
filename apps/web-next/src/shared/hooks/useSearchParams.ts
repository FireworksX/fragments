import { usePathname, useRouter, useSearchParams as useSearchParamsNext } from 'next/navigation'
import { builderOptions } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

export const useSearchParam = (key: string) => {
  const searchParams = useSearchParamsNext()
  const pathname = usePathname()
  const router = useRouter()

  const value = searchParams.get(key) ?? null

  const setValue = (nextValue: string) => {
    if (value !== nextValue) {
      const current = new URLSearchParams(Array.from(searchParams.entries()))

      if (!nextValue) {
        current.delete(key)
      } else {
        current.set(key, nextValue)
      }

      const search = current.toString()
      const query = search ? `?${search}` : ''

      router.replace(`${pathname}${query}`)
    }
  }

  return [value, setValue] as const
}
