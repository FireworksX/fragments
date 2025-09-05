import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { useContext, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animatableValue } from '@/shared/utils/animatableValue'
import { LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { isPartOfPrimary } from '@fragmentsx/render-core'
import { pick } from '@fragmentsx/utils'

const DEFAULT_BREAKPOINTS = [
  { name: 'Small', width: 100 },
  { name: 'Medium', width: 300 },
  { name: 'Large', width: 600 },
  { name: 'XLarge', width: 1000 }
]

function getFrameRange(frames, targetLink) {
  // 1. Сортируем фреймы по ширине (от меньшего к большему)
  const sortedFrames = [...frames].sort((a, b) => a.width - b.width)

  // 2. Находим индекс целевого фрейма
  const targetIndex = sortedFrames.findIndex(frame => frame.link === targetLink)

  if (targetIndex === -1) {
    return { from: null, to: null }
  }

  // 3. Определяем диапазон
  const currentFrame = sortedFrames[targetIndex]
  let from, to

  if (targetIndex === 0) {
    // Первый фрейм → from: null, to: (следующий фрейм - 1)
    from = null
    to = sortedFrames.length > 1 ? sortedFrames[targetIndex + 1].width - 1 : null
  } else if (targetIndex === sortedFrames.length - 1) {
    // Последний фрейм → from: текущий width, to: null
    from = currentFrame.width
    to = null
  } else {
    // Средний фрейм → from: текущий width, to: (следующий фрейм - 1)
    from = currentFrame.width
    to = sortedFrames[targetIndex + 1].width - 1
  }

  return { from, to }
}

export const useBreakpoints = () => {
  const { documentManager } = useBuilderDocument()
  const { layers } = useFragmentLayers()
  const childrenValues = useGraphStack(documentManager, layers ?? [], {
    selector: data => (data ? pick(data, 'width', '_type', '_id') : data)
  })

  const primaryLayer = childrenValues.find(child => isPartOfPrimary(documentManager, child))
  const breakpointKeys = childrenValues.map(documentManager.keyOfEntity)
  const { createBreakpoint } = useBuilderCreator()

  const breakpointLayers = childrenValues.map(breakpoint => ({
    link: documentManager.keyOfEntity(breakpoint),
    width: breakpoint?.width
  }))

  const addBreakpoint = (name: string, width: number) => {
    createBreakpoint({ name, threshold: width })
  }

  const getBreakpointRange = (breakpointLink: LinkKey) => getFrameRange(breakpointLayers, breakpointLink)

  const getBreakpointRangeLabel = (breakpointLink: LinkKey) => {
    const range = getBreakpointRange(breakpointLink)
    if (!range.from && !range.to) return ''

    if (range.from === null) {
      return `0-${range.to}`
    }

    if (range.to === null) {
      return `${range.from}+`
    }

    return `${range.from} - ${range.to}`
  }

  const allowedBreakpoints = useMemo(() => {
    const breakpoints = DEFAULT_BREAKPOINTS.filter(
      breakpoint => !childrenValues.find(v => v?.width === breakpoint.width)
    )

    return breakpoints
  }, [childrenValues])

  return {
    primaryLayer,
    childrenValues,
    breakpointKeys,
    getBreakpointRange,
    addBreakpoint,
    getBreakpointRangeLabel,
    allowedBreakpoints
  }
}
