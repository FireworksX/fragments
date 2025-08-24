import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'

interface BuilderCollectionProps {
  className?: string
}

export const BuilderCollection: FC<BuilderCollectionProps> = ({ className }) => {
  return (
    <Panel className={cn(styles.root, className)} title='Collection'>
      <ControlRow title='Source'>
        <ControlRowWide>
          <InputSelect>Create source</InputSelect>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}
