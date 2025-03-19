import { FC } from 'react'
import { DropdownOptionProps } from '@/shared/ui/DropdownOption/ui/DropdownOption'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import CheckIcon from '@/shared/icons/next/check.svg'

export interface DropdownOptionSelectProps extends DropdownOptionProps {
  isActive?: boolean
}

const DropdownOptionSelect: FC<DropdownOptionSelectProps> = ({ isActive, ...rest }) => {
  return <DropdownOption {...rest} suffix={isActive && <CheckIcon />} />
}

export default DropdownOptionSelect
