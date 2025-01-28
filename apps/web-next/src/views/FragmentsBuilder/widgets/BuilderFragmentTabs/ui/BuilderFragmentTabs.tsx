import { FC, use } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Touchable } from '@/shared/ui/Touchable'
import CloseIcon from '@/shared/icons/next/close.svg'
import { useBuilderTabs } from '../hooks/useBuilderTabs'
import PreviewIcon from '@/shared/icons/next/play.svg'

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
          <PreviewIcon className={styles.previewIcon} />
          {tab.name ?? 'Button'}
          <Touchable className={styles.close} isCapture preventDefault onClick={() => closeTab(tab.id)}>
            <CloseIcon />
          </Touchable>
        </Touchable>
      ))}
    </Container>
  )
}
