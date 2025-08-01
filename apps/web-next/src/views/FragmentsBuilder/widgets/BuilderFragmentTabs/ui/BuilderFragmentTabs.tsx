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
  isPreview?: boolean
  className?: string
}

export const BuilderFragmentTabs: FC<BuilderFragmentTabsProps> = ({ className, isPreview }) => {
  const { tabs, selectTab, closeTab } = useBuilderTabs()

  if (!tabs.length) {
    return null
  }

  return (
    <Container
      className={cn(styles.root, className, {
        [styles.preview]: isPreview
      })}
      data-testid='BuilderFragmentTabs'
    >
      {tabs.map((tab, index) => (
        <Touchable
          key={tab.key}
          effect='none'
          className={cn(styles.tab, { [styles.active]: tab.isActive })}
          onClick={() => selectTab(tab.id, tab.preview)}
        >
          <div className={styles.beforeSlot}>
            {tab.preview ? (
              <PreviewIcon className={styles.previewIcon} />
            ) : (
              <FragmentIcon className={styles.fragmentIcon} style={{ opacity: tab.fetching ? 0 : 1 }} />
            )}

            <Spinner
              className={styles.spinner}
              size={12}
              color='var(--text-color-accent)'
              style={{ opacity: tab.fetching ? 1 : 0 }}
            />
          </div>

          {tab.name ?? 'Fragment'}
          <Touchable className={styles.close} isCapture preventDefault onClick={() => closeTab(index)}>
            <CloseIcon />
          </Touchable>
        </Touchable>
      ))}
    </Container>
  )
}
