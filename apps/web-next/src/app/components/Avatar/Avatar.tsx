import { FC, useMemo } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InitialsAvatar, { InitialsAvatarNumberGradients } from './components/InitialsAvatar/InitialsAvatar'
import { AvatarPlaceholderInitial, useInitialAvatarPlaceholder } from './hooks/useInitialAvatarPlaceholder'
import CommonLogo, { CommonLogoProps } from '@/app/components/CommonLogo/CommonLogo'

export interface AvatarProps extends AvatarPlaceholderInitial {
  mode?: 'circle' | 'square'
  src?: string
  uniqueId?: string // По этому коду будет вычисляться цвет для заливки
  children?: string
  size?: CommonLogoProps['size']
  className?: string
}

const Avatar: FC<AvatarProps> = ({
  className,
  src,
  mode = 'circle',
  uniqueId,
  children,
  size,
  ...placeholderProps
}) => {
  const placeholderText = useInitialAvatarPlaceholder(placeholderProps)
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
        <CommonLogo src={src} size={size} withRadius withBackground alt={children} />
      ) : (
        <InitialsAvatar gradientColor={gradientCode} size={size}>
          {children || placeholderText}
        </InitialsAvatar>
      )}
    </div>
  )
}

export default Avatar
