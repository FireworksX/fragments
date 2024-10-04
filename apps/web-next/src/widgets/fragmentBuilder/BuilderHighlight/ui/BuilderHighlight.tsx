import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { LayerHighlightDragging } from '@/features/fragmentBuilder/LayerHighlightDragging'
import { LayerHighlightHover } from '@/features/fragmentBuilder/LayerHighlightHover'
import { LayerHighlightSelect } from '@/features/fragmentBuilder/LayerHighlightSelect/target'
import { LayerHighlightSelectParent } from '@/features/fragmentBuilder/LayerHighlightSelect/parent'
import { useBuilderHighlight } from '../hooks/useBuilderHighlight'

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const { opacity, selectStyles, parentStyles, dragHandler } = useBuilderHighlight()

  return (
    <animated.div className={cn(className, styles.root)} style={{ opacity }}>
      {children}
      <LayerHighlightDragging />
      <LayerHighlightHover />
      <LayerHighlightSelect selectStyles={selectStyles} dragHandler={dragHandler} />
      <LayerHighlightSelectParent style={parentStyles} />
    </animated.div>
  )
}

export default BuilderHighlight
