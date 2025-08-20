import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { InfoSectionCellProps } from '@/components/InfoSection/components/InfoSectionCell/ui/InfoSectionCell'

interface InfoSectionCellProgressProps extends Omit<InfoSectionCellProps, 'children'> {
  progress?: number
  label?: ReactNode
  value?: ReactNode
}

export const InfoSectionCellProgress: FC<InfoSectionCellProgressProps> = ({
  progress,
  value,
  label = '',
  ...restProps
}) => {
  return (
    <InfoSectionCell
      className={cn(restProps.className, styles.root)}
      style={{
        '--progress': `${progress}%`
      }}
      {...restProps}
    >
      <div className={styles.body}>
        {label}
        <div className={styles.value}>{value}</div>
      </div>
    </InfoSectionCell>
  )
}
