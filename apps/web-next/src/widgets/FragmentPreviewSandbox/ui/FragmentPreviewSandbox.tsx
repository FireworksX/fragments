import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { definition } from '@fragmentsx/definition'
import { Spinner } from '@/shared/ui/Spinner'
import { PreviewSandboxResize } from '../components/PreviewSandboxResize'
import { PreviewSandboxProps } from '../widgets/PreviewSandboxProps'
import { useFragmentPreviewSandbox } from '@/widgets/FragmentPreviewSandbox/hooks/useFragmentPreviewSandbox'
import { Instance, useFragmentManager, useRenderTarget } from '@fragmentsx/render-suite'

interface FragmentPreviewSandboxProps {
  fragmentId: unknown
  className?: string
}

export const FragmentPreviewSandbox: FC<FragmentPreviewSandboxProps> = ({ className, fragmentId }) => {
  const { props, setProps } = useFragmentPreviewSandbox()
  const { loading } = useFragmentManager(fragmentId)
  const { setRenderTarget } = useRenderTarget()

  useEffect(() => {
    setRenderTarget(definition.renderTarget.document)
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      {loading ? (
        <Spinner color='var(--text-color-accent)' />
      ) : (
        <div className={styles.content}>
          <div className={styles.actions}>
            <PreviewSandboxProps fragmentId={fragmentId} props={props} onChange={setProps} />
          </div>
          <PreviewSandboxResize>
            <Instance fragmentId={fragmentId} props={props} />
          </PreviewSandboxResize>
        </div>
      )}
    </div>
  )
}
