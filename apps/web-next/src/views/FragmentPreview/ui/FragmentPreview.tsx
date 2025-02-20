'use client'
import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
// import { Fragment } from '@/widgets/renderer/Fragment/Fragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { BuilderPreviewContainer } from '../components/BuilderPreviewContainer'
import { FragmentPreviewProvider } from '@/views/FragmentPreview/lib/FragmentPreviewContext'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'
import { renderTarget as defRenderTarget } from '@fragments/plugin-fragment'
import { Fragment } from '@fragments/renderer-editor'

interface FragmentPreviewProps {
  className?: string
}

export const FragmentPreview: FC<FragmentPreviewProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const { setRenderTarget } = useRenderTarget()

  useEffect(() => {
    setRenderTarget(defRenderTarget.document)
  }, [])

  return (
    <FragmentPreviewProvider>
      <div className={cn(styles.root, className)} data-testid='BuilderPreview'>
        <div className={styles.body}>
          <BuilderPreviewContainer>
            <Fragment layerKey={documentManager.$fragment.root} manager={documentManager} />
            {/*<Fragment layerKey={documentManager.$fragment.root} />*/}
          </BuilderPreviewContainer>
        </div>
      </div>
    </FragmentPreviewProvider>
  )
}
