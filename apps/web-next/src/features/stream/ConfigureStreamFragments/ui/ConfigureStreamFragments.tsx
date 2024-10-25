import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { Cell } from '@/shared/ui/Cell'
import { Chip } from '@/shared/ui/Chip/ui/Chip'
import { Container } from '@/shared/ui/Container'
import { StreamModalDetail } from '@/features/stream/StreamModalDetail'

interface ConfigureStreamFragmentsProps {}

export const ConfigureStreamFragments: FC<ConfigureStreamFragmentsProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Container className={styles.groups}>
          <Cell
            before={
              <div
                className={cn(styles.fragmentStatus, {
                  [styles.active]: true
                })}
              />
            }
            description='20%'
          >
            Melbet ru Gift MMA 15000 V2 - RU
          </Cell>
        </Container>

        <StreamModalDetail />
      </div>
    </div>
  )
}
