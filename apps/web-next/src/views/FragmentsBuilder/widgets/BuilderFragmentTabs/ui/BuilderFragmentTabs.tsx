import { FC, use } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Touchable } from '@/shared/ui/Touchable'
import CloseIcon from '@/shared/icons/next/close.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphEffect, useGraphStack } from '@graph-state/react'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface BuilderFragmentTabsProps {
  className?: string
}

export const BuilderFragmentTabs: FC<BuilderFragmentTabsProps> = ({ className }) => {
  const { tabs, selectTab, closeTab } = useBuilderTabs()

  return (
    <Container className={cn(styles.root, className)} data-testid='BuilderFragmentTabs'>
      {tabs.map((tab, index) => (
        <Touchable
          key={tab.name}
          effect='none'
          className={cn(styles.tab, { [styles.active]: tab.isActive })}
          onClick={() => selectTab(index)}
        >
          {tab.name}
          <Touchable className={styles.close} isCapture preventDefault onClick={() => closeTab(index)}>
            <CloseIcon />
          </Touchable>
        </Touchable>
      ))}
    </Container>
  )
}
