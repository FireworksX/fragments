import React, { ElementRef, FC, useEffect, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StackPanel, useStackCollector } from './hooks/useStackCollector'
import { animated } from '@react-spring/web'
import Touchable from '@/app/components/Touchable'
import Icon from '@adstore/web/src/components/Icon/Icon'

export interface StackCollectorProps {
  className?: string
  children: StackPanel[]
  onPrev?: () => void
  onClose?: () => void
}

const StackCollector: FC<StackCollectorProps> = ({ className, children, onPrev, onClose }) => {
  const ref = useRef<ElementRef<'div'>>(null)
  const { activePanel, getPanel, panelTransition, hasPrev, title, proxyPrevHandler, proxyCloseHandler } =
    useStackCollector({
      panels: React.Children.toArray(children) as StackPanel[],
      onClose,
      onPrev
    })

  useEffect(() => {
    const onClick = e => {
      const container = e.target.closest('[data-stack-container]')
      if (!container) {
        proxyCloseHandler()
      }
      // if (e.target !== ref.current) {
      //   let hasParent = false
      //   iterateParentOfNode(e.target, parent => {
      //     if (parent === ref.current && !hasParent) {
      //       hasParent = true
      //     }
      //   })
      //
      //   if (!hasParent) {
      //     proxyCloseHandler()
      //   }
      // }
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [onClose])

  if (!activePanel) {
    return null
  }

  return (
    <div className={cn(styles.root, className)} ref={ref} data-stack-container>
      <div className={styles.head}>
        {hasPrev && (
          <Touchable className={styles.actionButton} onClick={proxyPrevHandler}>
            <Icon name='caret-left' width={13} height={13} />
          </Touchable>
        )}
        <div className={styles.title}>{title}</div>
        <Touchable className={styles.actionButton} onClick={proxyCloseHandler}>
          <Icon name='close' width={13} height={13} />
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
