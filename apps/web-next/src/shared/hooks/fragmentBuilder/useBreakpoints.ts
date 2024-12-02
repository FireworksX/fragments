import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { nodes } from '@fragments/plugin-state'
import { animatableValue } from '@/shared/utils/animatableValue'

const DEFAULT_BREAKPOINTS = [
  { name: 'Mobile', width: 375 },
  { name: 'Tablet', width: 768 },
  { name: 'Laptop', width: 1200 },
  { name: 'Desktop', width: 1920 }
]

export const useBreakpoints = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, documentManager.fragment)
  const breakpointValues = useGraphStack(documentManager, fragmentGraph?.children ?? []).filter(
    child => child.isBreakpoint
  )
  const breakpointKeys = breakpointValues.map(documentManager.keyOfEntity)
  const primaryScreen = breakpointValues.find(breakpoint => breakpoint.isPrimary)

  const addBreakpoint = (name: string, width: number) => {
    documentManager[stateAlias].createBreakpointNode({ name, threshold: width })
  }

  const thresholds = useMemo(() => {
    const values = breakpointValues.map(breakpoint => animatableValue(breakpoint.width))
    // Сначала сортируем брейкпоинты по возрастанию
    const sortedBreakpoints = [...values].sort((a, b) => a - b)

    // Создаем массив диапазонов
    const ranges: { from: number; to: number }[] = []

    // Добавляем диапазоны
    for (let i = 0; i < sortedBreakpoints.length; i++) {
      const from = i === 0 ? 0 : sortedBreakpoints[i - 1] + 1
      const to = sortedBreakpoints[i]
      ranges.push({ from, to })
    }

    // Добавляем последний диапазон до бесконечности
    ranges.push({ from: sortedBreakpoints[sortedBreakpoints.length - 1] + 1, to: Infinity })

    return ranges
  }, [breakpointValues])

  const getThreshold = (width: number) => thresholds.find(threshold => threshold.from <= width && threshold.to >= width)

  const getThresholdLabel = (width: number) => {
    const threshold = getThreshold(width)

    if (!threshold) {
      return null
    }
    return `${threshold.from}-${threshold.to === Infinity ? '∞' : threshold.to}`
  }

  const allowedBreakpoints = useMemo(() => {
    const breakpoints = DEFAULT_BREAKPOINTS.filter(
      breakpoint => !breakpointValues.find(v => v.threshold === breakpoint.width)
    )

    return breakpoints
  }, [breakpointValues])

  return {
    primaryScreen,
    breakpointValues,
    breakpointKeys,
    getThreshold,
    addBreakpoint,
    thresholds,
    getThresholdLabel,
    allowedBreakpoints
  }
}
