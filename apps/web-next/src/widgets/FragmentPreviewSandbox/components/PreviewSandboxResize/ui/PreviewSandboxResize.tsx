import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import { usePreviewSandboxResize } from '../hooks/usePreviewSandboxResize'

interface PreviewSandboxResizeProps extends PropsWithChildren {
  className?: string
}

export const PreviewSandboxResize: FC<PreviewSandboxResizeProps> = ({ className, children }) => {
  const { containerRef, width$, bindWidth } = usePreviewSandboxResize()

  return (
    <div className={cn(styles.root, className)} ref={containerRef} data-testid='BuilderPreviewContainer'>
      <div className={styles.horizontal}>
        <animated.div {...bindWidth('left')} className={styles.horizontalHandler}>
          <animated.div className={styles.horizontalHandlerInner}></animated.div>
        </animated.div>
        <animated.div
          className={styles.inner}
          style={{
            width: width$
            // height: height$
          }}
        >
          {children}
        </animated.div>
        <animated.div {...bindWidth('right')} className={styles.horizontalHandler}>
          <animated.div className={styles.horizontalHandlerInner}></animated.div>
        </animated.div>
      </div>
      {/*<animated.div {...bindHeight()} className={styles.verticalHandler}>*/}
      {/*  <div className={styles.verticalHandlerInner}></div>*/}
      {/*</animated.div>*/}
    </div>
  )
}
