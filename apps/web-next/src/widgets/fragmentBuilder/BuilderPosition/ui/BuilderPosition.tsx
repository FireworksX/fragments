import { FC, memo, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderPosition } from '../hooks/useBuilderPosition'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import BuilderPositionToggle from '@/features/fragmentBuilder/BuilderPositionTogggle/ui/BuilderPositionToggler'

interface BuilderPositionProps {
  className?: string
}

const BuilderPosition: FC<BuilderPositionProps> = memo(({ className }) => {
  const { type, handleClickTotal, left, top, right, bottom, hasPosition } = useBuilderPosition()
  //
  // if (!selectionGraph?.position && selectionGraph?._type !== builderNodes.Screen) {
  //   return null
  // }

  const isVisible = type.value === 'absolute'

  if (!hasPosition) {
    return null
  }

  return (
    <Panel className={cn(styles.root, className)} title='Position'>
      {isVisible && (
        <>
          <div className={styles.body}>
            <BuilderPositionToggle
              top={top}
              right={right}
              bottom={bottom}
              left={left}
              onClickTotal={handleClickTotal}
            />
          </div>
          {/*<ControlRow title='Position'>*/}
          {/*  <InputNumber suffix='x' value={left.value} min={Infinity} max={Infinity} onChange={left.update} />*/}
          {/*  <InputNumber suffix='y' value={top.value} min={Infinity} max={Infinity} onChange={top.update} />*/}
          {/*</ControlRow>*/}
        </>
      )}

      <ControlRow title='Type'>
        <ControlRowWide>
          <Select value={type.value} onChange={type.update}>
            {type.options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
})

export default BuilderPosition
