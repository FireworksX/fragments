import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Plus from '@/shared/icons/plus.svg'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Touchable } from '@/shared/ui/Touchable'

interface HeaderBreakpointProps {
  className?: string
  name?: string
  width?: number
  activeWidths?: number[]
  onClickBreakpoint?: (name: string, width: number) => void | boolean
  onClickCustom?: () => void
}

const baseBreakpoints = [
  {
    label: 'Mobile',
    width: 320
  },
  {
    label: 'Tablet',
    width: 768
  },
  {
    label: 'Laptop',
    width: 1200
  }
]

const HeaderBreakpoint: FC<HeaderBreakpointProps> = ({
  className,
  activeWidths,
  name,
  width,
  onClickBreakpoint,
  onClickCustom
}) => {
  const availableBreakpoints = baseBreakpoints.filter(({ width }) => !activeWidths?.includes(width))

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.title}>
        {name} <span className={styles.width}>{width}</span>
      </div>
      {onClickBreakpoint && (
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {availableBreakpoints.map(point => (
                <DropdownOption
                  key={point.label}
                  indicator={point.width}
                  onClick={() => onClickBreakpoint && onClickBreakpoint(point.label, point.width)}
                >
                  {point.label}
                </DropdownOption>
              ))}
              <DropdownOption onClick={onClickCustom}>Custom</DropdownOption>
            </DropdownGroup>
          }
        >
          <Touchable TagName='button' className={styles.wrapper}>
            Add breakpoint
            <div className={styles.iconWrapper}>
              <Plus width={11} height={11} />
            </div>
          </Touchable>
        </Dropdown>
      )}
    </div>
  )
}

export default HeaderBreakpoint
