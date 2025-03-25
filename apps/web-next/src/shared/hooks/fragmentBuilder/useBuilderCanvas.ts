import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export const useBuilderCanvas = () => {
  const { builderManager } = use(BuilderContext)
  const [canvas] = useGraph(builderManager, builderManager.$canvas.key)

  return { canvas, manager: builderManager.$canvas }
}
