import { useContext, useEffect } from 'react'
import { useBuilderActions } from './useBuilderActions'
import { useMeasure } from 'react-use'
import { pick } from '@fragments/utils'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'

export const useBuilder = () => {
  const { graphState } = useContext(BuilderContext)
  const builderActions = useBuilderActions()
  const [pointerRefMeasure, bound] = useMeasure()
  const { select } = useBuilderSelection()

  useEffect(() => {
    graphState.resolve(graphState.viewport).setBound(pick(bound, 'width', 'height', 'x', 'y'))
  }, [bound, graphState.viewport])

  return {
    ...builderActions,
    pointerRefMeasure,
    unSelect: () => select(undefined)
  }
}
