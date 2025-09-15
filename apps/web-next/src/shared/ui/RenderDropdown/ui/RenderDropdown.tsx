import React, { FC, useRef } from 'react'
import DropdownGroup from '@/shared/ui/DropdownGroup/ui/DropdownGroup'
import DropdownOption, { DropdownOptionProps } from '@/shared/ui/DropdownOption/ui/DropdownOption'
import Dropdown, { DropdownProps } from '../../Dropdown/ui/Dropdown'

export interface DropdownRenderOption extends DropdownOptionProps {
  name?: string // unique name
  options?: DropdownRenderOption[][]
  optionsPlacement?: DropdownProps['placement']
  label: string
}

export interface RenderDropdownProps extends Omit<DropdownProps, 'placement' | 'options'> {
  depth?: number
  options: DropdownRenderOption[][]
  placement?: DropdownProps['placement'] | ((depth: number) => DropdownProps['placement'])
  className?: string
}

const RenderDropdown: FC<RenderDropdownProps> = ({
  className,
  placement = 'left-start',
  depth = 0,
  children,
  options,
  ...dropdownProps
}) => {
  const resultPlacement = typeof placement === 'function' ? placement(depth) : placement

  return (
    <Dropdown
      className={className}
      placement={resultPlacement}
      options={options.map((group, index) => (
        <DropdownGroup key={index}>
          {group.map(option => {
            const Option = option && (
              <DropdownOption
                key={option.name ?? option.label}
                {...option}
                hasNested={Array.isArray(option?.options) && option.options.some(op => !!op.length)}
              >
                {option.label}
              </DropdownOption>
            )

            return Array.isArray(option?.options) ? (
              <RenderDropdown
                key={option.name ?? option.label}
                arrow={false}
                depth={depth + 1}
                placement={placement}
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
