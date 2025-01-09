'use client'
import { ElementRef, FC, Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated, useSpring } from '@react-spring/web'
import { Touchable } from '@/shared/ui/Touchable'

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
  cellClassName?: string
}

const TabsSelector: FC<TabsSelectorProps> = animated(({ className, cellClassName, items, value, onChange }) => {
  const rootRef = useRef<ElementRef<'div'>>(null)
  const [switcherStyles, switcherApi] = useSpring(() => ({
    width: 0,
    x: 0
  }))

  const activeIndex = items.findIndex(({ name }) => name === value)

  const update = useCallback(() => {
    const activeCell = rootRef.current?.querySelector('[data-active="true"]')

    if (activeCell && activeCell instanceof HTMLElement) {
      switcherApi.start({
        width: activeCell.getBoundingClientRect().width - 3,
        x: activeCell.offsetLeft
      })
    }
  }, [switcherApi])

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
        '--count': items.length
      }}
    >
      <animated.div className={styles.switcher} style={switcherStyles} />
      {items.map((el, index) => (
        <Fragment key={el.name}>
          {index > 0 && <div className={styles.divider} />}
          <Touchable
            className={cn(styles.cell, cellClassName, {
              [styles.active]: el.name === value,
              [styles.disabled]: el.disabled
            })}
            disabled={el.disabled}
            TagName='button'
            data-active={el.name === value}
            key={index}
            onClick={() => onChange && onChange(el)}
          >
            {el.label}
          </Touchable>
        </Fragment>
      ))}
    </div>
  )
})

export default TabsSelector
