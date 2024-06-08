import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Image from 'next/image'
// import { alpha2ToIsoMap, isoFlags } from 'src/data/flags'

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
}

export const DEFAULT_LOGO_SIZE: CommonLogoSize = 44

const CommonLogo: React.FC<CommonLogoProps> = ({
  iso,
  src,
  size = DEFAULT_LOGO_SIZE,
  withRadius = false,
  withBackground,
  className,
  alt,
  withBorder = false
}) => {
  if (iso) {
    iso = iso.toUpperCase()
  }

  // if (iso && iso.length === 2) {
  //   iso = alpha2ToIsoMap[iso]
  // }

  // if (iso) {
  //   const image = isoFlags.has(iso) && iso.toLowerCase()
  //
  //   if (!image) {
  //     return null
  //   }
  //
  //   const x1 = `https://cdn.scores24.ru/upload/scores24/dist/static/img/general/flags/96dpi/${image}.png`
  //   const x2 = `https://cdn.scores24.ru/upload/scores24/dist/static/img/general/flags/192dpi/${image}.png`
  //   const x3 = `https://cdn.scores24.ru/upload/scores24/dist/static/img/general/flags/288dpi/${image}.png`
  //
  //   return (
  //     <Styled.Root
  //       className={className}
  //       size='flag'
  //       withRadius={withRadius}
  //       withBackground={withBackground}
  //       withBorder={withBorder}
  //     >
  //       <picture>
  //         <source suppressHydrationWarning data-srcset={`${x1} 1x, ${x3} 2x`} media='(min-width: 1600px)' />
  //         <source suppressHydrationWarning data-srcset={`${x1} 1x, ${x2} 2x`} media='(min-width: 320px)' />
  //         <Styled.Image src={x1} size={size} alt={alt || iso} />
  //       </picture>
  //     </Styled.Root>
  //   )
  // }

  if (src) {
    return (
      <div className={cn(className, styles.root, { [styles.withRadius]: withRadius })}>
        {typeof src === 'string' ? <Image src={src} alt={alt ?? 'Alt of image'} width={size} height={size} /> : src}
      </div>
    )
  }
  return null
}

export default CommonLogo
