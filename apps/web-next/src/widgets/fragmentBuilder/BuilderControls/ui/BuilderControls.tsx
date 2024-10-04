import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { AsideBar, AsideBarProps } from '@/shared/ui/AsideBar'

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

  const hasSize = [builderNodes.Frame, builderNodes.Text].some(type => type === selectionGraph?._type)
  const hasLayout = [builderNodes.Frame].some(type => type === selectionGraph?._type)
  const hasStyles = [builderNodes.Frame].some(type => type === selectionGraph?._type)
  const hasText = [builderNodes.Text].some(type => type === selectionGraph?._type)
  const hasCssOverride = [builderNodes.Frame].some(type => type === selectionGraph?._type)

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
