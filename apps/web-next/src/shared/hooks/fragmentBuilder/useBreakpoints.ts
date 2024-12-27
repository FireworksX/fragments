import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { nodes } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { LinkKey } from '@graph-state/core'

const DEFAULT_BREAKPOINTS = [
  { name: 'Mobile', width: 375 },
  { name: 'Tablet', width: 768 },
  { name: 'Laptop', width: 1200 },
  { name: 'Desktop', width: 1920 }
]

export const useBreakpoints = (customFragment?: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, customFragment ?? documentManager.fragment)
  const childrenValues = useGraphStack(documentManager, fragmentGraph?.children ?? [])
  const primaryLayer = childrenValues.find(child => child.isRootLayer())
  const breakpointValues = childrenValues.filter(child => child.isBreakpoint)
  const breakpointKeys = breakpointValues.map(documentManager.keyOfEntity)

  const addBreakpoint = (name: string, width: number) => {
    documentManager.resolve(documentManager[stateAlias].root).addBreakpoint({ name, threshold: width })
  }

  const thresholds = useMemo(() => {
    const values = breakpointValues.map(breakpoint => ({
      link: documentManager.keyOfEntity(breakpoint),
      threshold: animatableValue(breakpoint.threshold)
    }))

    if (values.length === 0) {
      return [
        {
          from: 0,
          to: Infinity,
          link: documentManager.keyOfEntity(primaryLayer)
        }
      ]
    }

    // Сначала сортируем брейкпоинты по возрастанию
    const sortedBreakpoints = [...values].sort((a, b) => a.threshold - b.threshold)

    // Создаем массив диапазонов
    const ranges: { from: number; to: number; link: LinkKey }[] = []

    // Добавляем диапазоны
    for (let i = 0; i < sortedBreakpoints.length; i++) {
      const from = i === 0 ? 0 : sortedBreakpoints[i - 1].threshold + 1
      const to = sortedBreakpoints[i].threshold
      ranges.push({ from, to, link: i === 0 ? documentManager.keyOfEntity(primaryLayer) : sortedBreakpoints[i].link })
    }

    // Добавляем последний диапазон до бесконечности
    ranges.push({
      from: sortedBreakpoints.at(-1)?.threshold + 1,
      to: Infinity,
      link: sortedBreakpoints.at(-1)?.link
    })

    return ranges
  }, [breakpointValues, documentManager, primaryLayer])

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
    primaryLayer,
    breakpointValues,
    breakpointKeys,
    getThreshold,
    addBreakpoint,
    thresholds,
    getThresholdLabel,
    allowedBreakpoints
  }
}
