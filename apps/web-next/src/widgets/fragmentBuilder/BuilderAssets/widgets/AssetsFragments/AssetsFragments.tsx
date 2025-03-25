import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Panel } from '@/shared/ui/Panel'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Touchable } from '@/shared/ui/Touchable'
import Plus from '@/shared/icons/plus.svg'
import { Dropdown } from '@/shared/ui/Dropdown'
import { Collapse } from '@/shared/ui/Collapse'
import { Cell } from '@/shared/ui/Cell'

interface AssetsFragmentsProps {
  className?: string
}

export const AssetsFragments: FC<AssetsFragmentsProps> = ({ className }) => (
  <Container className={cn(styles.root, className)} data-testid='AssetsFragments'>
    <Panel
      title='Fragments'
      aside={
        <Touchable action>
          <Plus width={14} height={14} />
        </Touchable>
      }
    >
      <Collapse title='Project'>
        <Container>
          <Cell>Button</Cell>
        </Container>
      </Collapse>
    </Panel>
  </Container>
)
