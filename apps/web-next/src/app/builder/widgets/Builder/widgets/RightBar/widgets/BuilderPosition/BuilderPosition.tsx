'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BuilderPositionToggle from './components/BuilderPositionTogggle/BuilderPositionToggler'
import { useBuilderPosition } from './hooks/useBuilderPosition'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Select from '@/app/components/Select/Select'

interface BuilderPositionProps {
  className?: string
}

const BuilderPosition: FC<BuilderPositionProps> = ({ className }) => {
  const { type, top, right, bottom, left } = useBuilderPosition()

  return (
    <Panel className={cn(styles.root, className)} title='Position'>
      {type.value === 'absolute' && (
        <div>
          <BuilderPositionToggle top={top} right={right} bottom={bottom} left={left} />
        </div>
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
