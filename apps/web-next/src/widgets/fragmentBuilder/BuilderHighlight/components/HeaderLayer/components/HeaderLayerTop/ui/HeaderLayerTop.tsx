import React, { FC, memo, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { LinkKey } from '@graph-state/core'
import { Touchable } from '@/shared/ui/Touchable'
import PlayIcon from '@/shared/icons/next/play.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useHeaderLayerTop } from '../hooks/useHeaderLayerTop'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'

interface HeaderLayerTopProps {
  layerKey: LinkKey
}

export const HeaderLayerTop: FC<HeaderLayerTopProps> = memo(({ layerKey }) => {
  const { name, selected, allowedBreakpoints, thresholdLabel, addBreakpoint } = useHeaderLayerTop(layerKey)

  return (
    <div
      className={cn(styles.root, {
        [styles.selected]: selected
      })}
    >
      <div className={styles.main}>
        <Touchable className={styles.preview}>
          <PlayIcon width={8} height={8} fill='currentColor' />
        </Touchable>
        <div className={styles.title}>{name}</div>
        <div className={styles.threshold}>{thresholdLabel}</div>
      </div>

      <Dropdown
        trigger='click'
        options={
          <>
            <DropdownGroup>
              {allowedBreakpoints.map(breakpoint => (
                <DropdownOption
                  key={breakpoint.width}
                  description={`${breakpoint.width}px`}
                  onClick={() => addBreakpoint(breakpoint.name, breakpoint.width)}
                >
                  {breakpoint.name}
                </DropdownOption>
              ))}
            </DropdownGroup>
            <DropdownGroup>
              <DropdownOption>Custom</DropdownOption>
            </DropdownGroup>
          </>
        }
      >
        <Touchable className={styles.addButton}>
          <PlusIcon />
        </Touchable>
      </Dropdown>
    </div>
  )
})
