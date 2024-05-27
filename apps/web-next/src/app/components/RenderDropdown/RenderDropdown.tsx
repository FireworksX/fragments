import { FC } from 'react'
import DropdownGroup from '../Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption, { DropdownOptionProps } from '../Dropdown/components/DropdownOption/DropdownOption'
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown'

export interface DropdownRenderOption extends DropdownOptionProps {
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
              <DropdownOption {...option} hasNested={Array.isArray(option.options)}>
                {option.label}
              </DropdownOption>
            )

            return Array.isArray(option.options) ? (
              <RenderDropdown
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
