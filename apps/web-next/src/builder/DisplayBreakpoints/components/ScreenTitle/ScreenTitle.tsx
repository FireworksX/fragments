import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import Plus from '@/app/svg/plus.svg'

interface BuilderScreenTitleProps {
  className?: string
  name?: string
  activeWidths?: number[]
  onClickScreen?: (name: string, width: number) => void | boolean
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

const ScreenTitle: FC<BuilderScreenTitleProps> = ({ className, activeWidths, name, onClickScreen, onClickCustom }) => {
  const availableBreakpoints = baseBreakpoints.filter(({ width }) => !activeWidths?.includes(width))

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.title}>{name}</div>
      {onClickScreen && (
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {availableBreakpoints.map(point => (
                <DropdownOption
                  key={point.label}
                  indicator={point.width}
                  onClick={() => onClickScreen && onClickScreen(point.label, point.width)}
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

export default ScreenTitle
