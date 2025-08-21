import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Image from 'next/image'
// import { alpha2ToIsoMap, isoFlags } from 'src/data/flags'

/**
 * CDN может обрабатывать определённые значения ширины и высоты.
 * Например, 16x16 такого логотипа не будет, но в дизайне нужен размер
 * именно 16x16. Поэтому мы принимаем 16 и находим ближайшее значение,
 * которое поддерживает cdn.
 */
const CDN_FLAGS_SIZES = [20, 40, 80, 160, 320, 640, 1280, 2560]

function findClosestGreaterOptimized(arr: number[], target: number) {
  if (arr.includes(target)) return target
  let minGreater: number | null = null

  for (const num of arr) {
    if (num > target && (minGreater === null || num < minGreater)) {
      minGreater = num
    }
  }

  return minGreater ?? arr.at(-1)
}

export type CommonLogoSize = 20 | 24 | 30 | 32 | 34 | 44 | 60 | 90

export interface CommonLogoProps {
  src?: string | ReactNode | null
  iso?: string | null
  size: CommonLogoSize
  withRadius?: boolean
  withBorder?: boolean
  withBackground?: boolean
  alt?: string | null
  className?: string
  imageClassName?: string
}

export const DEFAULT_LOGO_SIZE: CommonLogoSize = 44

const CommonLogo: React.FC<CommonLogoProps> = ({
  iso,
  src,
  size = DEFAULT_LOGO_SIZE,
  withRadius = false,
  className,
  imageClassName,
  alt
}) => {
  if (iso && iso.length === 2) {
    iso = iso.toLowerCase()
    const cdnSizeX1 = findClosestGreaterOptimized(CDN_FLAGS_SIZES, size)
    const cdnSizeX2 = findClosestGreaterOptimized(CDN_FLAGS_SIZES, size * 2)
    const cdnSizeX3 = findClosestGreaterOptimized(CDN_FLAGS_SIZES, size * 3)

    const x1 = `https://flagcdn.com/w${cdnSizeX1}/${iso}`
    const x2 = `https://flagcdn.com/w${cdnSizeX2}/${iso}`
    const x3 = `https://flagcdn.com/w${cdnSizeX3}/${iso}`

    return (
      <div
        className={cn(className, styles.root, styles.flag, { [styles.withRadius]: withRadius })}
        style={{ width: size }}
      >
        <picture>
          <source type='image/webp' srcSet={`${x1}.webp, ${x2}.webp 2x, ${x3}.webp 3x`} />
          <source type='image/png' srcSet={`${x1}.png,  ${x2}.png 2x, ${x3}.png 3x`} />
          <Image className={imageClassName} src={`${x1}.png`} width={size} height={size} alt={alt ?? iso} />
        </picture>
      </div>
    )
  }

  if (src) {
    return (
      <div className={cn(className, styles.root, { [styles.withRadius]: withRadius })}>
        {typeof src === 'string' ? (
          <Image className={imageClassName} src={src} alt={alt ?? 'Alt of image'} width={size} height={size} />
        ) : (
          src
        )}
      </div>
    )
  }
  return null
}

export default CommonLogo
