'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { InfoSection } from '@/components/InfoSection'
import PlusIcon from '@/shared/icons/next/plus.svg'
import VariableIcon from '@/shared/icons/next/variable.svg'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InfoSectionFooter } from '@/components/InfoSection/components/InfoSectionFooter'
import { PropertyIcon } from '@/shared/ui/PropertyIcon'
import { useAreaSettingsPage } from '@/views/AreaSettingsPage/hooks/useAreaSettingsPage'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Placeholder } from '@/components/Placeholder'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'
import { PropertyString } from '@/widgets/modals/PropertyString'
import { PropertyColor } from '@/widgets/modals/PropertyColor'
import { ColorPicker } from '@/widgets/modals/ColorPicker'
import { ScopeVariables } from '@/widgets/ScopeVariables'

interface AreasExperimentsPageProps {}

export const AreaSettingsPage: FC<AreasExperimentsPageProps> = withModalCollector(() => {
  const { properties, loadingProperties, updateProperties } = useAreaSettingsPage()

  return (
    <>
      <div className={styles.root}>
        <ScopeVariables loading={loadingProperties} properties={properties} onChange={updateProperties} />

        <div className={styles.popouts}></div>
      </div>
    </>
  )
}, {})
