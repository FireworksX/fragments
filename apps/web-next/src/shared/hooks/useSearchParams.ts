import { usePathname, useRouter, useSearchParams as useSearchParamsNext } from 'next/navigation'

export const useSearchParam = <T extends string>(keys: T[]) => {
  const searchParams = useSearchParamsNext()
  const pathname = usePathname()
  const router = useRouter()

  const value = keys.reduce<Record<T, unknown>>((acc, key) => {
    acc[key] = searchParams.get(key) ?? null
    return acc
  }, {} as any)

  const setValue = (values: Partial<Record<T, unknown>>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        current.delete(key)
      } else {
        current.set(key, value as any)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.replace(`${pathname}${query}`)
  }

  return [value, setValue] as const
}
