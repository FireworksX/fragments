'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BuilderPositionToggle from './components/BuilderPositionTogggle/BuilderPositionToggler'
import { useBuilderPosition } from './hooks/useBuilderPosition'
import Select from '@/app/components/Select/Select'
import { builderNodes } from '@fragments/fragments-plugin'
import Panel from '@/builder/components/Panel/Panel'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'
import InputNumber from '@/app/components/InputNumber/InputNumber'

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
          <InputNumber suffix='x' {...x} />
          <InputNumber suffix='y' {...y} />
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
