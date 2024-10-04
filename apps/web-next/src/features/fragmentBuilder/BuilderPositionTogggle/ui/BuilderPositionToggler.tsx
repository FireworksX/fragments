import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { LayerInvokerValue } from '@/builder/hooks/useLayerInvoker'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Touchable } from '@/shared/ui/Touchable'

interface BuilderPositionToggleProps {
  top: LayerInvokerValue<number>
  right: LayerInvokerValue<number>
  bottom: LayerInvokerValue<number>
  left: LayerInvokerValue<number>
  className?: string
}

const BuilderPositionToggle: FC<BuilderPositionToggleProps> = ({ className, top, right, bottom, left }) => {
  return (
    <div className={cn(styles.root, className)}>
      <div style={{ gridArea: 'top' }}>
        <InputNumber suffix='T' {...top} min={Infinity} max={Infinity} />
      </div>
      <div style={{ gridArea: 'right' }}>
        <InputNumber suffix='R' {...right} min={Infinity} max={Infinity} />
      </div>
      <div style={{ gridArea: 'bottom' }}>
        <InputNumber suffix='B' {...bottom} min={Infinity} max={Infinity} />
      </div>
      <div style={{ gridArea: 'left' }}>
        <InputNumber suffix='L' {...left} min={Infinity} max={Infinity} />
      </div>
      <div className={styles.toggle}>
        <div className={styles.toggleInner}></div>

        <Touchable PinTop className={cn(styles.pinButton, styles.pinTop)} />
        <Touchable PinRight className={cn(styles.pinButton, styles.pinRight)} />
        <Touchable PinBottom className={cn(styles.pinButton, styles.pinBottom)} />
        <Touchable PinLeft className={cn(styles.pinButton, styles.pinLeft)} />
      </div>
    </div>
  )
}

export default BuilderPositionToggle
