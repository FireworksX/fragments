import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Instance, useFragmentManager } from '@fragments/render-react'
import { useRenderTarget } from '@fragments/render-react'
import { definition } from '@fragments/definition'
import { Spinner } from '@/shared/ui/Spinner'

interface FragmentPreviewSandboxProps {
  fragmentId: unknown
  className?: string
}

export const FragmentPreviewSandbox: FC<FragmentPreviewSandboxProps> = ({ className, fragmentId }) => {
  const { loading } = useFragmentManager(fragmentId)
  const { setRenderTarget } = useRenderTarget()

  useEffect(() => {
    setRenderTarget(definition.renderTarget.document)
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      {loading ? <Spinner color='var(--text-color-accent)' /> : <Instance fragmentId={fragmentId} />}
    </div>
  )
}
