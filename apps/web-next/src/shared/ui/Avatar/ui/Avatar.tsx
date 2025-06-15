import { FC, useMemo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CommonLogo, { CommonLogoProps } from '@/shared/ui/CommonLogo/ui/CommonLogo'
import { AvatarPlaceholderInitial } from '@/shared/ui/InitialsAvatar/hooks/useInitialAvatarPlaceholder'
import { InitialsAvatar, InitialsAvatarNumberGradients } from '@/shared/ui/InitialsAvatar'

export interface AvatarProps extends AvatarPlaceholderInitial {
  mode?: 'circle' | 'square'
  src?: string
  uniqueId?: string // По этому коду будет вычисляться цвет для заливки
  children?: string
  withRadius?: string
  size?: CommonLogoProps['size']
  className?: string
}

const Avatar: FC<AvatarProps> = ({
  className,
  src,
  mode = 'circle',
  uniqueId,
  withRadius,
  children,
  size,
  ...placeholderProps
}) => {
  const numbers = useMemo(
    () =>
      (uniqueId || '')
        .split('')
        .map(char => char.charCodeAt(0))
        .reduce((acc, val) => acc + val, 0),
    [uniqueId]
  )

  const gradientCode = uniqueId ? (((numbers % 6) + 1) as InitialsAvatarNumberGradients) : 1

  return (
    <div className={cn(className, styles.root)}>
      {src ? (
        <CommonLogo src={src} size={size} withBackground withRadius={withRadius} alt={children} />
      ) : (
        <InitialsAvatar gradientColor={gradientCode} withRadius={withRadius} size={size} {...placeholderProps}>
          {children}
        </InitialsAvatar>
      )}
    </div>
  )
}

export default Avatar
