import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Select } from '@/shared/ui/Select'
import { useBuilderCollection } from '@/widgets/fragmentBuilder/BuilderCollection/hooks/useBuilderCollection'
import { keyOfEntity } from '@graph-state/core'
import { Button } from '@/shared/ui/Button'
import { capitalize } from '@/shared/utils/capitalize'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'

interface BuilderCollectionProps {
  className?: string
}

export const BuilderCollection: FC<BuilderCollectionProps> = ({ className }) => {
  const { source } = useBuilderCollection()
  const { editProperty } = useFragmentProperties()

  return (
    <Panel className={cn(styles.root, className)} title='Collection'>
      <ControlRow title='Source'>
        <ControlRowWide>
          <Select value={source.value} onChange={source.onChange}>
            {source.sources.map(source => (
              <option value={keyOfEntity(source)}>{source?.name ?? source?._id}</option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
      <ControlRow>
        <ControlRowWide>
          <Button stretched mode='secondary' onClick={() => editProperty(source.value)}>
            Edit source
          </Button>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}
