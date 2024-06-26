import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'

interface BuilderFragmentWrapperProps extends PropsWithChildren {
  variantKey: string
  className?: string
}

const BuilderFragmentWrapper: FC<BuilderFragmentWrapperProps> = ({ className, children, variantKey }) => {
  const { graphState } = useContext(BuilderContext)
  const [variantValue] = useGraph(graphState, variantKey)

  return (
    <div className={cn(styles.root, className)} data-root-node>
      <div className={styles.titleWrapper}>
        {variantValue.name} {variantValue.isPrimary && '- Primary'}
      </div>
      {children}
    </div>
  )
}

export default BuilderFragmentWrapper
