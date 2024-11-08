import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AsideBar, AsideBarProps } from '@/shared/ui/AsideBar'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { nodes } from '@fragments/plugin-state'
import BuilderFragmentInstance from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/BuilderFragmentInstance'

interface ControlsProps extends AsideBarProps {
  className?: string
  positionNode?: ReactNode
  sizeNode?: ReactNode
  layoutNode?: ReactNode
  stylesNode?: ReactNode
  textNode?: ReactNode
  cssNode?: ReactNode
  instancePropsNode?: ReactNode
  fragmentGrowingNode?: ReactNode
}

const BuilderControls: FC<ControlsProps> = ({
  className,
  positionNode,
  sizeNode,
  layoutNode,
  stylesNode,
  textNode,
  cssNode,
  instancePropsNode,
  fragmentGrowingNode,
  ...asideProps
}) => {
  const { selectionGraph } = useBuilderSelection()

  const hasGrowing = [nodes.Fragment].some(type => type === selectionGraph?._type)
  const hasSize = [nodes.Frame, nodes.Text, nodes.FragmentInstance].some(type => type === selectionGraph?._type)
  const hasLayout = [nodes.Frame].some(type => type === selectionGraph?._type)
  const hasStyles = [nodes.Frame].some(type => type === selectionGraph?._type)
  const hasText = [nodes.Text].some(type => type === selectionGraph?._type)
  const hasCssOverride = [nodes.Frame].some(type => type === selectionGraph?._type)
  const hasInstanceProps = [nodes.FragmentInstance].some(type => type === selectionGraph?._type)

  return (
    <AsideBar className={cn(className, styles.root)} {...asideProps}>
      {/*<BuilderLink />*/}
      {hasGrowing && fragmentGrowingNode}
      {positionNode}
      {hasSize && sizeNode}
      {hasLayout && layoutNode}
      {/*<BuilderEffects />*/}
      {hasStyles && stylesNode}
      {hasText && textNode}
      {hasInstanceProps && instancePropsNode}
      {hasCssOverride && cssNode}
    </AsideBar>
  )
}

export default BuilderControls
