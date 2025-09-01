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
import ImageIcon from '@/shared/icons/next/image.svg'
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
import { VariableIcon } from '@/entities/fragment/VariableIcon'

interface PropertyBooleanCellProps {
  propertyLink: LinkKey
  name?: string
  editOptions?: EditPropertyOptions
  className?: string
}

export const PropertyGenericCell: FC<PropertyBooleanCellProps> = ({ propertyLink, editOptions, name, className }) => {
  const {
    isTopLevel,
    defaultValue,
    type,
    name: propName,
    remove,
    handleClickProperty
  } = usePropertyGenericCell(propertyLink)
  const resultName = name ?? propName

  const selectValue = useMemo(() => {
    const complexTypesName = {
      [definition.variableType.Event]: 'Event',
      [definition.variableType.Object]: 'Fields',
      [definition.variableType.Array]: 'Stack'
    }

    if (type in complexTypesName) return complexTypesName[type]
    if (type === definition.variableType.String) return defaultValue || 'Empty'
    if (type === definition.variableType.Image) return 'Image'

    return defaultValue?.toString() ?? 'Error'
  }, [defaultValue, type])

  return (
    <ControlRow title={resultName}>
      <ControlRowWide>
        <InputSelect
          icon={<VariableIcon type={type} color='var(--light)' />}
          color='var(--primary)'
          onClick={() => handleClickProperty(editOptions)}
          onReset={remove}
        >
          {selectValue}
        </InputSelect>
      </ControlRowWide>
    </ControlRow>
  )
}
