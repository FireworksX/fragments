import { ElementType, FC, PropsWithChildren, ReactNode, useState } from 'react'
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

interface PropertyBooleanCellProps {
  propertyLink: LinkKey
  className?: string
}

export const PropertyGenericCell: FC<PropertyBooleanCellProps> = ({ propertyLink, className }) => {
  const {
    withExtend,
    dropdownActions,
    creating,
    creatingName,
    setCreatingName,
    type,
    name,
    children,
    creatingInputRef,
    creatingButtonRef,
    isOpen,
    toggleIsOpen,
    handleCancelAdd,
    handleAdd,
    handleClickProperty
  } = usePropertyGenericCell(propertyLink)

  const Icon = (
    {
      Event: EventIcon,
      Number: NumberIcon,
      String: StringIcon,
      Boolean: ToggleIcon,
      Object: ObjectIcon,
      Color: ObjectIcon,
      Array: ArrayIcon
    } as Record<keyof typeof definition.variableType, ElementType>
  )[type]

  return (
    <>
      <SmartCell
        className={cn(styles.root, className, { [styles.open]: isOpen })}
        icon={<div className={styles.icon}>{Icon && <Icon />}</div>}
        after={
          <RenderDropdown appendTo='body' trigger='click' options={[dropdownActions]} hideOnClick>
            <div className={styles.aside}>
              <Touchable TagName='div'>
                <MoreIcon />
              </Touchable>
            </div>
          </RenderDropdown>
        }
        onClick={handleClickProperty}
      >
        {name}
      </SmartCell>

      {creating && (
        <div className={styles.creatingContainer}>
          <InputText
            ref={creatingInputRef}
            placeholder='Name'
            value={creatingName}
            onChangeValue={setCreatingName}
            onBlur={handleCancelAdd}
            onSubmit={handleAdd}
          />
          <Button ref={creatingButtonRef} mode='secondary' onClick={handleAdd}>
            Add
          </Button>
        </div>
      )}

      {isOpen && (
        <div className={styles.children}>
          {children.map(child => (
            <PropertyGenericCell key={child} propertyLink={child} />
          ))}
        </div>
      )}
    </>
  )
}
