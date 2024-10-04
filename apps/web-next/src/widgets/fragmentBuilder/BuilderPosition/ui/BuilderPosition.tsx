import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderPosition } from '../hooks/useBuilderPosition'
import { BuilderContext } from '@/builder/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'

interface BuilderPositionProps {
  className?: string
}

const BuilderPosition: FC<BuilderPositionProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph, type, x, y } = useBuilderPosition()
  //
  // if (!selectionGraph?.position && selectionGraph?._type !== builderNodes.Screen) {
  //   return null
  // }

  return (
    <Panel className={cn(styles.root, className)} title='Position'>
      {type.value === 'absolute' && (
        // <div className={styles.body}>
        //   <BuilderPositionToggle top={top} right={right} bottom={bottom} left={left} />
        // </div>
        <ControlRow title='Position'>
          <InputNumber suffix='x' {...x} min={Infinity} max={Infinity} />
          <InputNumber suffix='y' {...y} min={Infinity} max={Infinity} />
        </ControlRow>
      )}
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
