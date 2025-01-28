import { useLocalStorageValue, UseLocalStorageValueOptions } from '@/shared/hooks/useLocalStorageValue'

export const useLocalStorageArray = <T = unknown>(
  key: string,
  initialValue: T[],
  options?: UseLocalStorageValueOptions
) => {
  const [value, setValue] = useLocalStorageValue(key, initialValue, options)

  const push = (...values: T[]) => {
    const nextValue = [...value, ...values]
    setValue(nextValue)
  }

  const splice = (index: number, deleteCount?: number) => {
    const nextValue = value.toSpliced(index, deleteCount)
    setValue(nextValue)
  }

  return {
    value,
    push,
    splice,
    setValue
  }
}
