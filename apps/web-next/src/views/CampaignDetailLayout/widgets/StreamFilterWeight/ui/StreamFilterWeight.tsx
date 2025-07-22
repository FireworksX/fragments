import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { Slider } from '@/shared/ui/Slider'
import { Chip } from '@/shared/ui/Chip'

interface StreamFilterWeightProps {
  value?: number
  className?: string
  onChange?: (value: number) => void
}

export const StreamFilterWeight: FC<StreamFilterWeightProps> = ({ className, value = 0, onChange }) => {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    setLocal(value)
  }, [value])

  return (
    <Dropdown
      trigger='click'
      placement='bottom-start'
      options={
        <DropdownGroup>
          <Slider value={local} max={100} min={0} onChange={setLocal} />
        </DropdownGroup>
      }
      onHide={() => {
        onChange?.(local)
      }}
    >
      <Chip className={cn(styles.root, className)} prefix='Weight:'>
        {local}%
      </Chip>
    </Dropdown>
  )
}
