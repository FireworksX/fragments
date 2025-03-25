import { FC } from 'react'
import DropdownGroup from '@/shared/ui/DropdownGroup/ui/DropdownGroup'
import DropdownOption, { DropdownOptionProps } from '@/shared/ui/DropdownOption/ui/DropdownOption'
import Dropdown, { DropdownProps } from '../../Dropdown/ui/Dropdown'

export interface DropdownRenderOption extends DropdownOptionProps {
  name?: string // unique name
  options?: DropdownRenderOption[][]
  optionsPlacement?: DropdownProps['placement']
  label: string
}

export interface RenderDropdownProps extends DropdownProps {
  options: DropdownRenderOption[][]
  className?: string
}

const RenderDropdown: FC<RenderDropdownProps> = ({ className, children, options, ...dropdownProps }) => {
  return (
    <Dropdown
      className={className}
      options={options.map((group, index) => (
        <DropdownGroup key={index}>
          {group.map(option => {
            const Option = (
              <DropdownOption
                key={option.name ?? option.label}
                {...option}
                hasNested={Array.isArray(option.options) && option.options[0].length > 0}
              >
                {option.label}
              </DropdownOption>
            )

            return Array.isArray(option.options) ? (
              <RenderDropdown
                key={option.name ?? option.label}
                arrow={false}
                placement={option.optionsPlacement ?? 'left-start'}
                options={option.options}
              >
                {Option}
              </RenderDropdown>
            ) : (
              Option
            )
          })}
        </DropdownGroup>
      ))}
      {...dropdownProps}
    >
      {children}
    </Dropdown>
  )
}

export default RenderDropdown
