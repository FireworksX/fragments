import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import CornerIcon from '@/shared/icons/next/corner.svg'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import { usePreviewSandboxResize } from '../hooks/usePreviewSandboxResize'
import { Touchable } from '@/shared/ui/Touchable'

interface PreviewSandboxResizeProps extends PropsWithChildren {
  className?: string
}

export const PreviewSandboxResize: FC<PreviewSandboxResizeProps> = ({ className, children }) => {
  const { containerRef, bind, width$, height$ } = usePreviewSandboxResize()

  return (
    <div className={cn(styles.root, className)} ref={containerRef} data-testid='BuilderPreviewContainer'>
      <animated.div
        className={styles.content}
        style={{
          width: width$,
          height: height$
        }}
      >
        <div className={styles.inner}>{children}</div>

        <Touchable {...bind('left')} className={cn(styles.handler, styles.leftHandler, styles.horizontalHandler)}>
          <div className={styles.horizontalHandlerInner}></div>
        </Touchable>

        <Touchable {...bind('right')} className={cn(styles.handler, styles.rightHandler, styles.horizontalHandler)}>
          <div className={styles.horizontalHandlerInner}></div>
        </Touchable>

        <Touchable {...bind('bottom')} className={cn(styles.handler, styles.bottomHandler, styles.verticalHandler)}>
          <div className={styles.verticalHandlerInner}></div>
        </Touchable>

        <Touchable {...bind('bottom-right')} className={cn(styles.handler, styles.brCorner)}>
          <CornerIcon width='var(--safe-gap)' height='var(--safe-gap)' />
        </Touchable>
      </animated.div>
    </div>
  )
}
