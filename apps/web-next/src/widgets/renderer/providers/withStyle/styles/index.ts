import { Graph } from '@graph-state/core'
import { useLayoutStyles } from './useLayoutStyles'
import { useSceneStyles } from './useSceneStyles'
import { useCornerStyles } from './useCornerStyles'
import { useFillStyles } from './useFillStyles'
import { useBorderStyles } from './useBorderStyles'
import { useSizeStyles } from './useSizeStyles'
import { usePositionStyles } from './usePositionStyles'

export const useStyles = (graph: Graph) => {
  const layoutStyles = useLayoutStyles(graph)
  const sceneStyles = useSceneStyles(graph)
  const cornerStyles = useCornerStyles(graph)
  const fillStyles = useFillStyles(graph)
  const borderStyles = useBorderStyles(graph)
  const sizeStyles = useSizeStyles(graph)
  const positionStyles = usePositionStyles(graph)

  return {
    ...layoutStyles,
    ...sceneStyles,
    ...cornerStyles,
    ...fillStyles,
    ...borderStyles,
    ...sizeStyles,
    ...positionStyles
  }
}