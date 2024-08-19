import { createContext, FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BuilderLink from './widgets/BuilderLink/BuilderLink'
import AsideBar, { AsideBarProps } from '@/builder/components/AsideBar'
import BuilderCssOverride from './widgets/BuilderCssOverride/BuilderCssOverride'
import BuilderStyles from './widgets/BuilderStyles/BuilderStyles'
import BuilderLayout from './widgets/BuilderLayout/BuilderLayout'
import BuilderSize from './widgets/BuilderSize/BuilderSize'
import BuilderPosition from './widgets/BuilderPosition/BuilderPosition'
import BuilderText from './widgets/BuilderText/BuilderText'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { builderNodes } from '@fragments/fragments-plugin/performance'

interface ControlsProps extends AsideBarProps {
  className?: string
}

const BuilderControls: FC<ControlsProps> = ({ className, ...asideProps }) => {
  const { selectionGraph } = useBuilderSelection()

  const hasSize = [builderNodes.Frame, builderNodes.Breakpoint, builderNodes.Text].some(
    type => type === selectionGraph?._type
  )
  const hasLayout = [builderNodes.Frame, builderNodes.Breakpoint].some(type => type === selectionGraph?._type)
  const hasStyles = [builderNodes.Frame, builderNodes.Breakpoint].some(type => type === selectionGraph?._type)
  const hasText = [builderNodes.Text].some(type => type === selectionGraph?._type)
  const hasCssOverride = [builderNodes.Frame].some(type => type === selectionGraph?._type)

  return (
    <AsideBar className={cn(className, styles.root)} {...asideProps}>
      {/*<BuilderComponent />*/}
      {/*<BuilderLink />*/}
      <BuilderPosition />
      {hasSize && <BuilderSize />}
      {hasLayout && <BuilderLayout />}
      {/*<BuilderEffects />*/}
      {hasStyles && <BuilderStyles />}
      {hasText && <BuilderText />}
      {hasCssOverride && <BuilderCssOverride />}
    </AsideBar>
  )
}

export default BuilderControls
