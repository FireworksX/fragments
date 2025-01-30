import { FC, use } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Touchable } from '@/shared/ui/Touchable'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useBuilderTabs } from '../hooks/useBuilderTabs'
import PreviewIcon from '@/shared/icons/next/play.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import { Spinner } from '@/shared/ui/Spinner'

interface BuilderFragmentTabsProps {
  className?: string
}

export const BuilderFragmentTabs: FC<BuilderFragmentTabsProps> = ({ className }) => {
  const { tabs, selectTab, closeTab } = useBuilderTabs()

  if (!tabs.length) {
    return null
  }

  return (
    <Container className={cn(styles.root, className)} data-testid='BuilderFragmentTabs'>
      {tabs.map((tab, index) => (
        <Touchable
          key={tab.name}
          effect='none'
          className={cn(styles.tab, { [styles.active]: tab.isActive })}
          onClick={() => selectTab(tab.id)}
        >
          <div className={styles.beforeSlot}>
            {/*<PreviewIcon className={styles.previewIcon} />*/}
            <FragmentIcon className={styles.fragmentIcon} style={{ opacity: tab.fetching ? 0 : 1 }} />
            <Spinner
              className={styles.spinner}
              size={12}
              color='var(--text-color-accent)'
              style={{ opacity: tab.fetching ? 1 : 0 }}
            />
          </div>

          {tab.name ?? 'Button'}
          <Touchable className={styles.close} isCapture preventDefault onClick={() => closeTab(tab.id)}>
            <CloseIcon />
          </Touchable>
        </Touchable>
      ))}
    </Container>
  )
}
