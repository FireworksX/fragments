import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Touchable } from '@/shared/ui/Touchable'
import CloseIcon from '@/shared/icons/next/close.svg'

interface BuilderFragmentTabsProps {
  className?: string
}

const list = ['PredictionCard', 'Button', 'PredictionOutcome']

export const BuilderFragmentTabs: FC<BuilderFragmentTabsProps> = ({ className }) => (
  <Container className={cn(styles.root, className)} data-testid='BuilderFragmentTabs'>
    {list.map((item, index) => (
      <Touchable className={cn(styles.tab, { [styles.active]: index === 1 })}>
        {item}
        <Touchable className={styles.close}>
          <CloseIcon />
        </Touchable>
      </Touchable>
    ))}
  </Container>
)
