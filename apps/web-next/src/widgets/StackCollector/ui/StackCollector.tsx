import React, { createContext, ElementRef, FC, useEffect, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StackPanel, useStackCollector } from '../hooks/useStackCollector'
import { animated } from '@react-spring/web'
import CaretLeft from '@/shared/icons/caret-left.svg'
import Close from '@/shared/icons/close.svg'
import { nextTick } from '@/shared/utils/nextTick'
import { Touchable } from '@/shared/ui/Touchable'

export interface StackCollectorProps {
  className?: string
  children: StackPanel[]
  onPrev?: () => void
  onClose?: () => void
}

const StackCollector: FC<StackCollectorProps> = ({ className, children, onPrev, onClose }) => {
  const ref = useRef<ElementRef<'div'>>(null)
  const { activePanel, getPanel, panelTransition, hasPrev, title, description, proxyPrevHandler, proxyCloseHandler } =
    useStackCollector({
      panels: React.Children.toArray(children) as StackPanel[],
      onClose,
      onPrev
    })

  useEffect(() => {
    if (activePanel) {
      const onClick = e => {
        const container = e.target.closest('[data-stack-container]')
        if (!container) {
          proxyCloseHandler()
        }
      }

      nextTick(() => {
        document.addEventListener('click', onClick)
      })
      return () => {
        document.removeEventListener('click', onClick)
      }
    }
  }, [activePanel])

  if (!activePanel) {
    return null
  }

  return (
    <div className={cn(styles.root, className)} ref={ref} data-stack-container>
      <div className={styles.head}>
        {hasPrev && (
          <Touchable className={styles.actionButton} onClick={proxyPrevHandler}>
            <CaretLeft width={13} height={13} />
          </Touchable>
        )}
        <div className={styles.title}>
          {title}
          {description && <div className={styles.description}>{description}</div>}
        </div>
        <Touchable className={styles.actionButton} onClick={proxyCloseHandler}>
          <Close width={13} height={13} />
        </Touchable>
      </div>
      <div className={styles.body}>
        {panelTransition((styles, activePanel) => {
          return <animated.div style={{ ...styles, inset: 10 }}>{getPanel(activePanel)}</animated.div>
        })}
      </div>
    </div>
  )
}

export default StackCollector
