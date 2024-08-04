'use client'
import { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Button from '@/app/components/Button'
import Touchable from '@/app/components/Touchable'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import DefaultCursor from '@/app/svg/default-cursor.svg'
import GrabCursor from '@/app/svg/grab-cursor.svg'
import Lightning from '@/app/svg/lightning.svg'
import Variables from '@/app/svg/variables.svg'

interface ComponentItem {
  kind: 'component'
  component: ReactNode
  hidden?: boolean
}

interface DelimiterItem {
  kind: 'delimiter'
  hidden?: boolean
}

interface BuilderFloatingBarProps {
  className?: string
  actions: (ComponentItem | DelimiterItem)[]
}

const BuilderFloatingBar: FC<BuilderFloatingBarProps> = ({ className, actions = [] }) => {
  return (
    <div className={cn(styles.root, className)}>
      {actions
        .filter(c => !c.hidden)
        .map((cell, index) => {
          if (cell.kind === 'delimiter') {
            return <div key={index} className={styles.delimiter} />
          }
          if (cell.kind === 'component') {
            return cell.component
          }

          return null
        })}
    </div>
  )
}

export default BuilderFloatingBar
