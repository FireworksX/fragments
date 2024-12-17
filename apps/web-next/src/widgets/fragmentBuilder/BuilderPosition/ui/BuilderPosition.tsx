import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderPosition } from '../hooks/useBuilderPosition'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { to } from '@fragments/springs-factory'
import { useInterpolation } from '@/shared/hooks/useInterpolation'

interface BuilderPositionProps {
  className?: string
}

const BuilderPosition: FC<BuilderPositionProps> = ({ className }) => {
  const { selectionGraph, type, left, top, hasPosition } = useBuilderPosition()
  //
  // if (!selectionGraph?.position && selectionGraph?._type !== builderNodes.Screen) {
  //   return null
  // }

  const isVisible = useInterpolation([type.value], v => v === 'absolute')

  if (!hasPosition) {
    return null
  }

  return (
    <Panel className={cn(styles.root, className)} title='Position'>
      <AnimatedVisible visible={isVisible}>
        {/*// <div className={styles.body}>*/}
        {/*//   <BuilderPositionToggle top={top} right={right} bottom={bottom} left={left} />*/}
        {/*// </div>*/}
        <ControlRow title='Position'>
          <InputNumber suffix='x' {...left} min={Infinity} max={Infinity} />
          <InputNumber suffix='y' {...top} min={Infinity} max={Infinity} />
        </ControlRow>
      </AnimatedVisible>

      <ControlRow title='Type'>
        <ControlRowWide>
          <Select value={type.value} onChange={type.onChange}>
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
}

export default BuilderPosition
