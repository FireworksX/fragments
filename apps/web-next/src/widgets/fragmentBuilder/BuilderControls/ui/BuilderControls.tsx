import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AsideBar, AsideBarProps } from '@/shared/ui/AsideBar'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { nodes } from '@fragments/plugin-state'

interface ControlsProps extends AsideBarProps {
  className?: string
  positionNode?: ReactNode
  sizeNode?: ReactNode
  layoutNode?: ReactNode
  stylesNode?: ReactNode
  textNode?: ReactNode
  cssNode?: ReactNode
}

const BuilderControls: FC<ControlsProps> = ({
  className,
  positionNode,
  sizeNode,
  layoutNode,
  stylesNode,
  textNode,
  cssNode,
  ...asideProps
}) => {
  const { selectionGraph } = useBuilderSelection()

  const hasSize = [nodes.Frame, nodes.Text].some(type => type === selectionGraph?._type)
  const hasLayout = [nodes.Frame].some(type => type === selectionGraph?._type)
  const hasStyles = [nodes.Frame].some(type => type === selectionGraph?._type)
  const hasText = [nodes.Text].some(type => type === selectionGraph?._type)
  const hasCssOverride = [nodes.Frame].some(type => type === selectionGraph?._type)

  return (
    <AsideBar className={cn(className, styles.root)} {...asideProps}>
      {/*<BuilderComponent />*/}
      {/*<BuilderLink />*/}
      {positionNode}
      {hasSize && sizeNode}
      {hasLayout && layoutNode}
      {/*<BuilderEffects />*/}
      {hasStyles && stylesNode}
      {hasText && textNode}
      {hasCssOverride && cssNode}
    </AsideBar>
  )
}

export default BuilderControls
