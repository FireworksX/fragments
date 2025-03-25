'use client'
import { FC, ReactElement, useCallback, Children } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated, useSpring } from '@react-spring/web'
import { TabItemProps } from '@/shared/ui/TabItem'

interface TabsProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[]
  className?: string
}

const Tabs: FC<TabsProps> = ({ className, children: inputChildren }) => {
  const children = Children.toArray(inputChildren)

  const [switcherStyles, switcherApi] = useSpring(() => ({
    width: 0,
    x: 0,
    opacity: 0
  }))

  const updateMouseOver = useCallback(
    e => {
      const activeCell = e?.currentTarget

      if (activeCell && activeCell instanceof HTMLElement) {
        e.cuurentTarget = activeCell
        switcherApi.start({
          width: activeCell.getBoundingClientRect().width - 6,
          x: activeCell.offsetLeft,
          opacity: 1
        })
      }
    },
    [switcherApi]
  )

  const hideSwitcher = useCallback(() => {
    switcherApi.start({
      opacity: 0
    })
  }, [switcherApi])

  return (
    <div className={cn(styles.root, className)}>
      <animated.div className={styles.switcher} style={switcherStyles} />
      {children.map(item => (
        <div className={styles.cell} key={item.props.name} onMouseOver={updateMouseOver} onMouseLeave={hideSwitcher}>
          {item}
        </div>
      ))}
    </div>
  )
}

export default Tabs
