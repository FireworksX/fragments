'use client'
import { ElementRef, FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import * as Styled from '@adstore/web/src/components/TabsSelector/styles'
import Touchable from '@/app/components/Touchable'

export interface TabsSelectorItem {
  name: string | number | boolean
  label: ReactNode
  disabled?: boolean
}

interface TabsSelectorProps {
  items: TabsSelectorItem[]
  value: string // находит из массива items по имени
  onChange?: (item: TabsSelectorItem) => void
  className?: string
}

const TabsSelector: FC<TabsSelectorProps> = ({ className, items, value, onChange }) => {
  const rootRef = useRef<ElementRef<'div'>>(null)
  const [switcherWidth, setSwitcherWidth] = useState(0)
  const [switcherOffset, setSwitcherOffset] = useState(0)

  const activeIndex = items.findIndex(({ name }) => name === value)

  const update = useCallback(() => {
    const activeCell = rootRef.current?.querySelector('[data-active="true"]')

    if (activeCell && activeCell instanceof HTMLElement) {
      setSwitcherWidth(activeCell.getBoundingClientRect().width - 6)
      setSwitcherOffset(activeCell.offsetLeft)
    }
  }, [rootRef])

  useEffect(() => {
    const debounceUpdate = update //TODO debounce(update, 300)
    window.addEventListener('resize', debounceUpdate)

    return () => window.removeEventListener('resize', debounceUpdate)
  }, [update])

  useEffect(() => {
    update()
  }, [items, rootRef, activeIndex, update])

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      style={{
        '--count': items.length,
        '--width': `${switcherWidth}px`,
        '--offset': `${switcherOffset}px`
      }}
    >
      <div className={styles.switcher} />
      {items.map((el, index) => (
        <Touchable
          className={cn(styles.cell, {
            [styles.active]: el.name === value,
            [styles.disabled]: el.disabled
          })}
          TagName='button'
          data-active={el.name === value}
          key={index}
          onClick={() => onChange && onChange(el)}
        >
          {el.label}
        </Touchable>
      ))}
    </div>
  )
}

export default TabsSelector
