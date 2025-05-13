import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AsideBar, AsideBarProps } from '@/shared/ui/AsideBar'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import BuilderFragmentInstance from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/BuilderFragmentInstance'
import { Container } from '@/shared/ui/Container'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { definition } from '@fragments/definition'
import BuilderInteractions from '@/widgets/fragmentBuilder/BuilderInteractions/ui/BuilderInteractions'

interface ControlsProps extends AsideBarProps {
  className?: string
  linkNode?: ReactNode
  positionNode?: ReactNode
  sizeNode?: ReactNode
  layoutNode?: ReactNode
  stylesNode?: ReactNode
  textNode?: ReactNode
  interactionsNode?: ReactNode
  imageNode?: ReactNode
  attributesNode?: ReactNode
  fragmentGeneral?: ReactNode
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
  interactionsNode,
  stylesNode,
  fragmentGeneral,
  textNode,
  imageNode,
  cssNode,
  instancePropsNode,
  fragmentGrowingNode,
  fragmentPropsNode,
  attributesNode
}) => {
  const { selection } = useBuilderSelection()
  const layerInfo = useLayerInfo(selection)

  const hasGrowing = [definition.nodes.Fragment].some(type => layerInfo.type === type)
  const hasFragmentProps = [definition.nodes.Fragment].some(type => layerInfo.type === type)
  const hasPosition = [
    definition.nodes.Frame,
    definition.nodes.Breakpoint,
    definition.nodes.Text,
    definition.nodes.Instance,
    definition.nodes.Image
  ].some(type => layerInfo.type === type)
  const hasSize = [
    definition.nodes.Frame,
    definition.nodes.Breakpoint,
    definition.nodes.Text,
    definition.nodes.Instance,
    definition.nodes.Image
  ].some(type => layerInfo.type === type)
  const hasLayout = [definition.nodes.Frame, definition.nodes.Breakpoint].some(type => layerInfo.type === type)
  const hasStyles = [
    definition.nodes.Frame,
    definition.nodes.Text,
    definition.nodes.Image,
    definition.nodes.Instance
  ].some(type => layerInfo.type === type)
  const hasText = [definition.nodes.Text].some(type => layerInfo.type === type)
  const hasImage = [definition.nodes.Image].some(type => layerInfo.type === type)
  const hasCssOverride = [definition.nodes.Frame, definition.nodes.Text].some(type => layerInfo.type === type)
  const hasInstanceProps = [definition.nodes.Instance].some(type => layerInfo.type === type)
  const hasInteractions = [definition.nodes.Frame].some(type => layerInfo.type === type)

  return (
    <Container className={cn(className, styles.root)}>
      {fragmentGeneral}
      {selection && (
        <>
          {/*<BuilderLink />*/}
          {linkNode}
          {hasInteractions && interactionsNode}
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
        </>
      )}
    </Container>
  )
}

export default BuilderControls
