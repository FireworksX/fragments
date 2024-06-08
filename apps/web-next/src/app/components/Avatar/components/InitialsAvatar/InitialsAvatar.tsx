import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AvatarProps } from '../../Avatar'

/**
 * Градиенты, которые можно использовать в алгоритме поиска градиентов по числовому идентификатору пользователя.
 * @example user.id % 6 + 1
 */
export type InitialsAvatarNumberGradients = 1 | 2 | 3 | 4 | 5 | 6
export type InitialsAvatarTextGradients = 'red' | 'pink' | 'orange' | 'yellow' | 'green' | 'l-blue' | 'blue' | 'violet'

export interface InitialsAvatarProps extends Pick<AvatarProps, 'size'>, PropsWithChildren {
  className?: string
  gradientColor?: InitialsAvatarNumberGradients | InitialsAvatarTextGradients
}

const COLORS_NUMBER_TO_TEXT_MAP: Record<InitialsAvatarNumberGradients, InitialsAvatarTextGradients> = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'green',
  5: 'l-blue',
  6: 'violet'
}

const InitialsAvatar: FC<InitialsAvatarProps> = ({ className, gradientColor, size, children }) => {
  const gradientName =
    typeof gradientColor === 'string' ? gradientColor : gradientColor && COLORS_NUMBER_TO_TEXT_MAP[gradientColor]

  function getInitialsFontSize(avatarSize: number) {
    const calculatedFontSize = Math.ceil(avatarSize * 0.36)
    const evenFix = calculatedFontSize % 2
    return calculatedFontSize + evenFix
  }

  return (
    <div
      className={cn(styles.root, className, styles[gradientName ?? 'red'])}
      style={{
        '--size': `${size}px`,
        '--font-size': `${getInitialsFontSize(size)}px`
      }}
      size={size}
    >
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default InitialsAvatar
