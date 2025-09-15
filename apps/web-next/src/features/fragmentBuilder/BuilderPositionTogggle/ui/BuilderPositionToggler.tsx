import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { LayerInvokerValue } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Touchable } from '@/shared/ui/Touchable'
import { DispatchValue } from '@/shared/types'

interface ExtraDispatchValue<T> extends DispatchValue<T> {
  disabled?: boolean
  onClick?: () => void
}

interface BuilderPositionToggleProps {
  top: ExtraDispatchValue<number>
  right: ExtraDispatchValue<number>
  bottom: ExtraDispatchValue<number>
  left: ExtraDispatchValue<number>
  onClickTotal?: (nowIsActive: boolean) => void
  className?: string
}

const BuilderPositionToggle: FC<BuilderPositionToggleProps> = ({
  className,
  top,
  right,
  bottom,
  left,
  onClickTotal
}) => {
  const totalIsActive = [top, right, bottom, left].every(pin => pin.disabled)

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
        <Touchable
          className={cn(styles.toggleInner, {
            [styles.toggleInnerActive]: totalIsActive
          })}
          onClick={() => onClickTotal?.(totalIsActive)}
        ></Touchable>

        <Touchable
          className={cn(styles.pinButton, styles.pinTop, { [styles.pinActive]: !top.disabled })}
          onClick={top.onClick}
        />
        <Touchable
          className={cn(styles.pinButton, styles.pinRight, { [styles.pinActive]: !right.disabled })}
          onClick={right.onClick}
        />
        <Touchable
          className={cn(styles.pinButton, styles.pinBottom, { [styles.pinActive]: !bottom.disabled })}
          onClick={bottom.onClick}
        />
        <Touchable
          className={cn(styles.pinButton, styles.pinLeft, { [styles.pinActive]: !left.disabled })}
          onClick={left.onClick}
        />
      </div>
    </div>
  )
}

export default BuilderPositionToggle
