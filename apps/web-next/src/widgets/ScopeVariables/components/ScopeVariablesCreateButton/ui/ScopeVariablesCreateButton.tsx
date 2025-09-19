import { FC } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PropertyIcon } from '@/shared/ui/PropertyIcon'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { Dropdown } from '@/shared/ui/Dropdown'

interface ScopeVariablesCreateButtonProps {
  definitions?: (keyof typeof definition.variableType)[]
  className?: string
  onClick?: (type: keyof typeof definition.variableType) => void
}

export const ScopeVariablesCreateButton: FC<ScopeVariablesCreateButtonProps> = ({
  className,
  definitions = [],
  onClick
}) => {
  return (
    <Dropdown
      trigger='click'
      hideOnClick
      options={
        <DropdownGroup>
          {definitions.map(el => (
            <DropdownOption key={el} icon={<PropertyIcon type={el} />} onClick={() => onClick?.(el)}>
              {el}
            </DropdownOption>
          ))}
        </DropdownGroup>
      }
    >
      <Button className={className} icon={<PlusIcon />}>
        Add variable
      </Button>
    </Dropdown>
  )
}
