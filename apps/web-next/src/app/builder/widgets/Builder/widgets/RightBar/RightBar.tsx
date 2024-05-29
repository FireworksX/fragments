import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BuilderLink from './widgets/BuilderLink/BuilderLink'
import BuilderPosition from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderPosition/BuilderPosition'
import BuilderSize from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderSize/BuilderSize'
import BuilderLayout from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderLayout/BuilderLayout'
import BuilderEffects from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderEffects/BuilderEffects'
import BuilderStyles from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderStyles/BuilderStyles'
import BuilderCssOverride from '@/app/builder/widgets/Builder/widgets/RightBar/widgets/BuilderCssOverride/BuilderCssOverride'

interface RightBarProps {
  className?: string
}

const RightBar: FC<RightBarProps> = ({ className }) => (
  <div className={cn(className, styles.root)}>
    <BuilderLink />
    <BuilderPosition />
    <BuilderSize />
    <BuilderLayout />
    <BuilderEffects />
    <BuilderStyles />
    <BuilderCssOverride />
  </div>
)

export default RightBar
