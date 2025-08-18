import React, { ElementType, FC, PropsWithChildren, ReactNode, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ExtendIcon from '@/shared/icons/next/chevrone-right.svg'
import NumberIcon from '@/shared/icons/next/hash.svg'
import StringIcon from '@/shared/icons/next/type.svg'
import ToggleIcon from '@/shared/icons/next/toggle-left.svg'
import ObjectIcon from '@/shared/icons/next/braces.svg'
import ArrayIcon from '@/shared/icons/next/brackets.svg'
import EventIcon from '@/shared/icons/next/zap.svg'
import MoreIcon from '@/shared/icons/next/ellipsis.svg'
import ColorIcon from '@/shared/icons/next/color.svg'
import { Cell } from '@/shared/ui/Cell'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { usePropertyGenericCell } from '@/entities/fragment/PropertyGenericCell/hooks/usePropertyGenericCell'
import { LinkKey } from '@graph-state/core'
import { InputText } from '@/shared/ui/InputText'
import { Select } from '@/shared/ui/Select'
import { RenderDropdown } from '@/shared/ui/RenderDropdown'
import { definition } from '@fragmentsx/definition'
import SmartCell from '@/shared/ui/SmartCell/ui/SmartCell'
import InputSelect from '../../../../shared/ui/InputSelect/ui/InputSelect'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { EditPropertyOptions } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'

interface PropertyBooleanCellProps {
  propertyLink: LinkKey
  name?: string
  editOptions?: EditPropertyOptions
  className?: string
}

export const PropertyGenericCell: FC<PropertyBooleanCellProps> = ({ propertyLink, editOptions, name, className }) => {
  const { isTopLevel, defaultValue, type, name: propName, handleClickProperty } = usePropertyGenericCell(propertyLink)
  const resultName = name ?? propName

  const Icon = (
    {
      [definition.variableType.Event]: EventIcon,
      [definition.variableType.Number]: NumberIcon,
      [definition.variableType.String]: StringIcon,
      [definition.variableType.Boolean]: ToggleIcon,
      [definition.variableType.Object]: ObjectIcon,
      [definition.variableType.Color]: ColorIcon,
      [definition.variableType.Array]: ArrayIcon
    } as Record<keyof typeof definition.variableType, ElementType>
  )[type]

  const selectValue = useMemo(() => {
    const complexTypesName = {
      [definition.variableType.Event]: 'Event',
      [definition.variableType.Object]: 'Fields'
    }

    if (type in complexTypesName) return complexTypesName[type]
    if (type === definition.variableType.String) return defaultValue || 'Empty'

    return defaultValue?.toString() ?? 'Error'
  }, [defaultValue, type])

  if (!isTopLevel) {
    return null
  }

  return (
    <ControlRow title={resultName}>
      <ControlRowWide>
        <InputSelect
          icon={<Icon color='var(--light)' />}
          color='var(--primary)'
          onClick={() => handleClickProperty(editOptions)}
        >
          {selectValue}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}
