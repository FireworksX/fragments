'use client'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'
import RunIcon from '@/shared/icons/play.svg'
import PauseIcon from '@/shared/icons/pause.svg'
import { useStreamPreviewItem } from '@/widgets/campaigns/StreamPreviewItem/hooks/useStreamPreviewItem'
import { Touchable, TouchableProps } from '@/shared/ui/Touchable'
import { Chip } from '@/shared/ui/Chip/ui/Chip'
import { ToggleActiveButton } from '@/features/ToggleActiveButton/ui/ToggleActiveButton'

export interface StreamPreviewItemProps extends PropsWithChildren, TouchableProps {
  id?: number
  name: string
  logo?: string
  active?: boolean
  weight?: number
  filters?: {}[]
  className?: string
}

export const StreamPreviewItem: FC<StreamPreviewItemProps> = props => {
  const { loadingUpdateStream, toggleActive } = useStreamPreviewItem(props)

  return (
    <Touchable className={cn(styles.root, props.className)} onClick={props.onClick}>
      <Container className={styles.container}>
        <div className={styles.body}>
          {props.id && <div className={styles.id}>#{props.id}</div>}

          <div className={styles.logo} />
          {props.name && <div className={styles.name}>{props.name}</div>}

          <div className={styles.aside}>
            <ToggleActiveButton isActive={props?.active} loading={loadingUpdateStream} onClick={toggleActive} />
          </div>
        </div>

        <div className={styles.tags}>
          <Chip className={styles.tag} prefix='Weight:'>
            {props.weight}%
          </Chip>
          <Chip className={styles.tag} prefix='Country:'>
            Russia, China, USA, Canada
          </Chip>
          <Chip className={styles.tag} prefix='Device type:'>
            Mobile
          </Chip>
          <Chip className={styles.tag} prefix='Device OS:'>
            iOS, Android
          </Chip>
        </div>

        {props.children}
      </Container>
    </Touchable>
  )
}
