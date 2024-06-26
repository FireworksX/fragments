import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Star2 from '@/app/svg/star-2.svg'
import LinkChain2 from '@/app/svg/link-chain2.svg'
import { builderNodes } from '@fragments/fragments-plugin'
import { ViewerCellFlags } from '@/app/builder/widgets/Builder/widgets/TreeViewer/widgets/TreeViewerCell/TreeViewerCell'

interface TreeViewerCellAsideProps extends ViewerCellFlags {
  type: ViewerCell['type']
  min?: number
  max?: number
  className?: string
}

const TreeViewerCellAside: FC<TreeViewerCellAsideProps> = ({
  className,
  type,
  min,
  max,
  isPrimary,
  hasLink,
  hasEffects
}) => {
  let Fragments: ReactNode[] = []

  if (type === builderNodes.Screen || type === builderNodes.ComponentVariant) {
    Fragments = [
      isPrimary ? (
        <div className={styles.label}>Primary</div>
      ) : type === builderNodes.Screen ? (
        <div className={styles.label}>
          {min}-{max}
        </div>
      ) : null
    ]
  }

  if (hasEffects) {
    Fragments.push(<Star2 width={12} height={12} />)
  }

  if (hasLink) {
    Fragments.push(<LinkChain2 width={12} height={12} />)
  }

  return <div className={cn(styles.root, className)}>{Fragments}</div>
}

export default TreeViewerCellAside
