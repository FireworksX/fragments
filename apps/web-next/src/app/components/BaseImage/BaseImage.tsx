import React from 'react'
import cn from 'classnames'

export interface BaseImageProps {
  src: string
  useImageProxy?: boolean
  size?: number
  sizesDesktop?: number[]
  className?: string
  alt?: string | null
  lazy?: boolean
  cropped?: boolean
}

const replaceSrc = (src: string, sizes: number[], scale: number, cropped: boolean, useImageProxy: boolean) => {
  const [w, h] = [sizes[0], sizes[1] || sizes[0]].map(size => size * scale)

  if (useImageProxy) {
    const DOMAIN = (process.env.CURRENT_DOMAIN || '').replace('dev', 'stage')

    return `${DOMAIN}/imgproxy/fill/${w}/${h}/sm/0/${(src || '').replace('/', '_')}=.webp`
  }
  const sizeString = `w${w}-h${h}${cropped ? '-c' : ''}`
  return src.replace(/(\/(?:upload|user-avatars)\/[\w\d]+\/)origin(\/)/, `$1${sizeString}$2`)
}

export const FALLBACK_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

const BaseImage: React.FC<BaseImageProps> = ({
  src,
  size = 60,
  sizesDesktop,
  className,
  alt: propsAlt,
  lazy = false,
  cropped = false,
  useImageProxy = false
}) => {
  const sizes = [size, size]
  const isResizeable = src && (src.match(/\/(upload|user-avatars)\/[\w\d]+\/origin\//) || useImageProxy)

  const alt = propsAlt || undefined

  if (!isResizeable) {
    return lazy ? (
      <img
        className={cn('lazyload', className)}
        src={FALLBACK_BASE64}
        suppressHydrationWarning
        data-src={src}
        data-srcset={src}
        alt={alt}
      />
    ) : (
      <img className={className} src={src} alt={alt} />
    )
  }

  const src1x = replaceSrc(src, sizes, 1, cropped, useImageProxy)
  const src2x = replaceSrc(src, sizes, 2, cropped, useImageProxy)

  const imageElement = lazy ? (
    <img
      src={FALLBACK_BASE64}
      suppressHydrationWarning
      data-src={src1x}
      data-srcset={`${src1x} 1x, ${src2x} 2x`}
      alt={alt}
      className={cn('lazyload', className)}
    />
  ) : (
    <img src={src1x} srcSet={`${src1x} 1x, ${src2x} 2x`} alt={alt} className={className} />
  )

  if (!sizesDesktop) {
    return imageElement
  }
  const srcDesktop1x = replaceSrc(src, sizesDesktop, 1, cropped, useImageProxy)
  const srcDesktop2x = replaceSrc(src, sizesDesktop, 2, cropped, useImageProxy)
  return (
    <picture>
      {lazy ? (
        <source
          suppressHydrationWarning
          data-srcset={`${srcDesktop1x} 1x, ${srcDesktop2x} 2x`}
          media='(min-width: 768px)'
        />
      ) : (
        <source srcSet={`${srcDesktop1x} 1x, ${srcDesktop2x} 2x`} media='(min-width: 768px)' />
      )}
      {imageElement}
    </picture>
  )
}

export default BaseImage
