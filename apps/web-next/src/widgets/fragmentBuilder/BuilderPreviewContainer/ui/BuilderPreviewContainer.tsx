import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated, to } from '@react-spring/web'
import styles from './styles.module.css'
import { useBuilderPreviewContainer } from '../hooks/useBuilderPreviewContainer'
import { InputNumber } from '@/shared/ui/InputNumber'

interface BuilderPreviewContainerProps extends PropsWithChildren {
  className?: string
}

export const BuilderPreviewContainer: FC<BuilderPreviewContainerProps> = ({ className, children }) => {
  const { width, bindWidth, height, bindHeight } = useBuilderPreviewContainer()

  return (
    <div className={cn(styles.root, className)} data-testid='BuilderPreviewContainer'>
      <div className={styles.horizontal}>
        <animated.div {...bindWidth('left')} className={styles.horizontalHandler}>
          <animated.div className={styles.horizontalHandlerInner}></animated.div>
        </animated.div>
        <animated.div
          className={styles.inner}
          style={{
            width: width,
            height: height
          }}
        >
          {children}
        </animated.div>
        <animated.div {...bindWidth('right')} className={styles.horizontalHandler}>
          <animated.div className={styles.horizontalHandlerInner}></animated.div>
        </animated.div>
      </div>
      <animated.div {...bindHeight()} className={styles.verticalHandler}>
        <div className={styles.verticalHandlerInner}></div>
      </animated.div>
    </div>
  )
}
