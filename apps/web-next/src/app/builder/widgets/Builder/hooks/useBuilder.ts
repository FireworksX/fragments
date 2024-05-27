import { useEffect } from 'react'
import { useBuilderActions } from './useBuilderActions'
import { useMeasure } from 'react-use'
import { pick } from '@adstore/utils'
import { useStore } from '@nanostores/react'
import { $statex } from '../../../store/builderRouterStore'
import { useBuilderSelection } from '../../../hooks/useBuilderSelection'

export const useBuilder = () => {
  const statex = useStore($statex)
  const builderActions = useBuilderActions()
  const [pointerRefMeasure, bound] = useMeasure()
  const { select } = useBuilderSelection()

  useEffect(() => {
    statex.viewport.setBound(pick(bound, 'width', 'height', 'x', 'y'))
  }, [bound, statex.viewport])

  return {
    ...builderActions,
    pointerRefMeasure,
    unSelect: () => select(undefined)
  }
}
