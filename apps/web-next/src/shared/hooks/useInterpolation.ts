import { useMemo } from 'react'
import { to } from '@react-spring/web'

export const useInterpolation = (values: unknown[], callback, deps = []) =>
  useMemo(() => to(values, callback), [...values, ...deps])
