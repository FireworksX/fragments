import { Graph } from '@graph-state/core'
import { useLayoutStyles } from '@/builder/renderer/providers/withStyle/styles/useLayoutStyles'
import { useSceneStyles } from '@/builder/renderer/providers/withStyle/styles/useSceneStyles'
import { useCornerStyles } from '@/builder/renderer/providers/withStyle/styles/useCornerStyles'
import { useFillStyles } from '@/builder/renderer/providers/withStyle/styles/useFillStyles'
import { useBorderStyles } from '@/builder/renderer/providers/withStyle/styles/useBorderStyles'
import { useSizeStyles } from '@/builder/renderer/providers/withStyle/styles/useSizeStyles'
import { usePositionStyles } from '@/builder/renderer/providers/withStyle/styles/usePositionStyles'

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
