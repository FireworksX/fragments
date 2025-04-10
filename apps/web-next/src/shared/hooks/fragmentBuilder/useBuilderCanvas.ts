import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphEffect } from '@graph-state/react'

export const useBuilderCanvas = (selector?: () => Record<unknown, unknown>) => {
  const { builderManager } = use(BuilderContext)
  const [canvas] = useGraph(builderManager, builderManager.$canvas.key, { selector })

  return { canvas, manager: builderManager.$canvas }
}
