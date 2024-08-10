import { createContext, FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BuilderLink from './widgets/BuilderLink/BuilderLink'
import BuilderComponent from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderComponent/BuilderComponent'
import AsideBar, { AsideBarProps } from '@/builder/components/AsideBar'
import BuilderCssOverride from '@/builder/Controls/widgets/BuilderCssOverride/BuilderCssOverride'
import BuilderStyles from '@/builder/Controls/widgets/BuilderStyles/BuilderStyles'
import BuilderLayout from '@/builder/Controls/widgets/BuilderLayout/BuilderLayout'
import BuilderSize from '@/builder/Controls/widgets/BuilderSize/BuilderSize'
import BuilderPosition from '@/builder/Controls/widgets/BuilderPosition/BuilderPosition'
import BuilderEffects from '@/builder/Controls/widgets/BuilderEffects/BuilderEffects'
import { BuilderContext } from '@/builder/BuilderContext'
import BuilderText from '@/builder/Controls/widgets/BuilderText/BuilderText'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { builderNodes } from '@fragments/fragments-plugin/performance'

interface ControlsProps extends AsideBarProps {
  documentManager: unknown
  className?: string
}

const Controls: FC<ControlsProps> = ({ className, documentManager, ...asideProps }) => {
  const { selectionGraph } = useBuilderSelection()

  const hasLayout = selectionGraph?._type === builderNodes.Frame || selectionGraph?._type === builderNodes.Screen
  const hasStyles = selectionGraph?._type === builderNodes.Frame || selectionGraph?._type === builderNodes.Screen

  return (
    <AsideBar className={cn(className, styles.root)} {...asideProps}>
      {/*<BuilderComponent />*/}
      {/*<BuilderLink />*/}
      <BuilderPosition />
      <BuilderSize />
      {hasLayout && <BuilderLayout />}
      {/*<BuilderEffects />*/}
      {hasStyles && <BuilderStyles />}
      <BuilderText />
      {/*<BuilderCssOverride />*/}
    </AsideBar>
  )
}

export default Controls
