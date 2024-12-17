import { useMemo } from 'react'
import { to } from '@fragments/springs-factory'

export const useInterpolation = (values: unknown[], callback, deps = []) =>
  useMemo(() => to(values, callback), [...values, ...deps])
