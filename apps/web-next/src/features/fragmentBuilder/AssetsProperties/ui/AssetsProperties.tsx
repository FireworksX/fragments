import React, { FC, ReactNode } from 'react'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { Touchable } from '@/shared/ui/Touchable'
import Plus from '@/shared/icons/plus.svg'
import { Panel } from '@/shared/ui/Panel'
import { Container } from '@/shared/ui/Container'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { DropdownOption } from '@/shared/ui/DropdownOption'

interface AssetsPropertiesProps {
  propertiesTree: ReactNode
}

export const AssetsProperties: FC<AssetsPropertiesProps> = ({ propertiesTree }) => {
  const { createProperty, FRAGMENT_PROPERTY_TYPES } = useFragmentProperties()

  return (
    <Panel
      title='Properties'
      aside={
        <Dropdown
          trigger='click'
          options={
            <>
              <DropdownGroup>
                {FRAGMENT_PROPERTY_TYPES.map(type => (
                  <DropdownOption key={type} onClick={() => createProperty({ type })}>
                    {type}
                  </DropdownOption>
                ))}
              </DropdownGroup>
            </>
          }
        >
          <Touchable action>
            <Plus width={14} height={14} />
          </Touchable>
        </Dropdown>
      }
    >
      {propertiesTree}
    </Panel>
  )
}
