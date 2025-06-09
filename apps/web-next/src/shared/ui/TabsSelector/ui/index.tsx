'use client'
import { ComponentRef, ElementRef, FC, Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
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
  const rootRef = useRef<ComponentRef<'div'>>(null)
  const [switcherStyles, switcherApi] = useSpring(() => ({
    width: 0,
    x: 0
  }))

  const activeIndex = items.findIndex(({ name }) => name === value)

  const update = useCallback(() => {
    const activeCell = rootRef.current?.querySelector('[data-active="true"]')

    if (activeCell && activeCell instanceof HTMLElement) {
      switcherApi.start({
        width: activeCell.offsetWidth,
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
      {items.map((el, index) => {
        const isActive = el.name === value
        const hasDivider = index !== activeIndex + 1 && index !== activeIndex && index !== 0

        return (
          <Fragment key={el.name}>
            <div className={cn(styles.divider, { [styles.hidden]: !hasDivider })} />
            <Touchable
              className={cn(styles.cell, cellClassName, {
                [styles.active]: isActive,
                [styles.disabled]: el.disabled
              })}
              disabled={el.disabled}
              TagName='button'
              data-active={isActive}
              key={index}
              onClick={() => onChange && onChange(el)}
            >
              {el.label}
            </Touchable>
          </Fragment>
        )
      })}
    </div>
  )
})

export default TabsSelector
