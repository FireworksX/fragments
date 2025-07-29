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

interface AreasExperimentsPageProps {}

export const AreaSettingsPage: FC<AreasExperimentsPageProps> = withModalCollector(
  () => {
    const { properties, loadingProperties, definitionList, handleAddProperty, handleEditProperty } =
      useAreaSettingsPage()

    const AddButton = (
      <Dropdown
        trigger='click'
        hideOnClick
        options={
          <DropdownGroup>
            {definitionList.map(el => (
              <DropdownOption key={el} icon={<PropertyIcon type={el} />} onClick={() => handleAddProperty(el)}>
                {el}
              </DropdownOption>
            ))}
          </DropdownGroup>
        }
      >
        <Button icon={<PlusIcon />}>Add variable</Button>
      </Dropdown>
    )

    return (
      <>
        <div className={styles.root}>
          <InfoSection
            className={styles.section}
            loading={loadingProperties}
            header={
              <InfoSectionHeader
                title='Variables'
                description='Define area scope variable for use within campaings and fragments'
                aside={!!properties.length && AddButton}
              />
            }
            footer={<InfoSectionFooter>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</InfoSectionFooter>}
          >
            {!properties.length && (
              <InfoSectionCell>
                <Placeholder
                  title='Variable'
                  icon={<VariableIcon width={32} height={32} />}
                  description='Create first variable for use it within fragments'
                  actions={AddButton}
                />
              </InfoSectionCell>
            )}

            {properties.map(variable => (
              <InfoSectionCell
                key={variable?._id}
                title={variable?.name}
                description={`ID: ${variable?._id}`}
                after={
                  <Button mode='outline' onClick={() => handleEditProperty(variable._id)}>
                    Edit
                  </Button>
                }
                before={<PropertyIcon type={variable?.type} />}
              ></InfoSectionCell>
            ))}
          </InfoSection>

          <div className={styles.popouts}></div>
        </div>
      </>
    )
  },
  {
    [modalNames.propertyString]: <PropertyString />,
    [modalNames.propertyColor]: <PropertyColor />,
    [modalNames.colorPicker]: <ColorPicker />
  }
)
