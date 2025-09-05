import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { useCanvas } from '@/widgets/fragmentBuilder/BuilderCanvas/hooks/useCanvas'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { animated } from '@react-spring/web'
import { roundedNumber } from '@fragmentsx/utils'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'

interface BuilderCanvasScaleProps {
  className?: string
}

export const BuilderCanvasScale: FC<BuilderCanvasScaleProps> = ({ className }) => {
  const [scale] = useBuilderCanvasField('scale')

  return (
    <div className={cn(styles.root, className)}>
      <SelectMimicry className={styles.input}>
        <animated.div>{scale.to(value => `${roundedNumber(value * 100)}%`)}</animated.div>
      </SelectMimicry>
    </div>
  )
}
