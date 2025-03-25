import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { nodes } from '@fragments/plugin-fragment-spring'
import { animatableValue } from '@/shared/utils/animatableValue'
import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { isPartOfPrimary } from '@fragments/renderer-editor'
import { getLayer } from '@fragments/renderer-editor'

const DEFAULT_BREAKPOINTS = [
  { name: 'Mobile', width: 375 },
  { name: 'Tablet', width: 768 },
  { name: 'Laptop', width: 1200 },
  { name: 'Desktop', width: 1920 }
]

export const useBreakpoints = (customFragment?: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const { layers } = useFragmentLayers()
  const childrenValues = useGraphStack(documentManager, layers ?? [], {
    selector: data => (data ? { threshold: data.threshold, width: data.width } : data)
  })

  const primaryLayer = childrenValues.find(child => isPartOfPrimary(documentManager, child))
  const breakpointKeys = childrenValues.map(documentManager.keyOfEntity)
  const { createBreakpoint } = useBuilderCreator()

  const addBreakpoint = (name: string, width: number) => {
    createBreakpoint({ name, threshold: width })
  }

  const thresholds = useMemo(() => {
    const values = childrenValues.map(breakpoint => ({
      link: documentManager.keyOfEntity(breakpoint),
      threshold: breakpoint.threshold
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
  }, [childrenValues, documentManager, primaryLayer])

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
      breakpoint => !childrenValues.find(v => v.threshold === breakpoint.width)
    )

    return breakpoints
  }, [childrenValues])

  return {
    primaryLayer,
    childrenValues,
    breakpointKeys,
    getThreshold,
    addBreakpoint,
    thresholds,
    getThresholdLabel,
    allowedBreakpoints
  }
}
