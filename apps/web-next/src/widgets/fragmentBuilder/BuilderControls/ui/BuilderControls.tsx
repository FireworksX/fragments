import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AsideBar, AsideBarProps } from '@/shared/ui/AsideBar'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import BuilderFragmentInstance from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/BuilderFragmentInstance'
import { nodes } from '@fragments/plugin-fragment'
import { Container } from '@/shared/ui/Container'

interface ControlsProps extends AsideBarProps {
  className?: string
  linkNode?: ReactNode
  positionNode?: ReactNode
  sizeNode?: ReactNode
  layoutNode?: ReactNode
  stylesNode?: ReactNode
  textNode?: ReactNode
  imageNode?: ReactNode
  attributesNode?: ReactNode
  cssNode?: ReactNode
  instancePropsNode?: ReactNode
  fragmentGrowingNode?: ReactNode
  fragmentPropsNode?: ReactNode
}

const BuilderControls: FC<ControlsProps> = ({
  className,
  positionNode,
  linkNode,
  sizeNode,
  layoutNode,
  stylesNode,
  textNode,
  imageNode,
  cssNode,
  instancePropsNode,
  fragmentGrowingNode,
  fragmentPropsNode,
  attributesNode
}) => {
  const { selectionGraph } = useBuilderSelection()

  const hasGrowing = [nodes.Fragment].some(type => type === selectionGraph?._type)
  const hasFragmentProps = [nodes.Fragment].some(type => type === selectionGraph?._type)
  const hasPosition = [nodes.Frame, nodes.Breakpoint, nodes.Text, nodes.FragmentInstance, nodes.Image].some(
    type => type === selectionGraph?._type
  )
  const hasSize = [nodes.Frame, nodes.Breakpoint, nodes.Text, nodes.FragmentInstance, nodes.Image].some(
    type => type === selectionGraph?._type
  )
  const hasLayout = [nodes.Frame, nodes.Breakpoint].some(type => type === selectionGraph?._type)
  const hasStyles = [nodes.Frame, nodes.Text, nodes.Image].some(type => type === selectionGraph?._type)
  const hasText = [nodes.Text].some(type => type === selectionGraph?._type)
  const hasImage = [nodes.Image].some(type => type === selectionGraph?._type)
  const hasCssOverride = [nodes.Frame, nodes.Breakpoint].some(type => type === selectionGraph?._type)
  const hasInstanceProps = [nodes.FragmentInstance].some(type => type === selectionGraph?._type)

  return (
    <Container className={cn(className, styles.root)}>
      {/*<BuilderLink />*/}
      {linkNode}
      {hasGrowing && fragmentGrowingNode}
      {hasFragmentProps && fragmentPropsNode}
      {hasPosition && positionNode}
      {hasSize && sizeNode}
      {hasLayout && layoutNode}
      {/*<BuilderEffects />*/}
      {hasStyles && stylesNode}
      {hasText && textNode}
      {hasImage && imageNode}
      {hasInstanceProps && instancePropsNode}
      {hasCssOverride && cssNode}
      {attributesNode}
    </Container>
  )
}

export default BuilderControls
