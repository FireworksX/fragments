import { FC, PropsWithChildren, ReactNode } from 'react'
import { animated, Interpolation, SpringValue } from '@react-spring/web'

interface AnimatedHtmlProps {
  children?: string | Interpolation<string> | SpringValue<string>
  className?: string
}

export const AnimatedHtml: FC<AnimatedHtmlProps> = animated(({ children, ...rest }) => (
  <div {...rest} dangerouslySetInnerHTML={{ __html: children }}></div>
))
