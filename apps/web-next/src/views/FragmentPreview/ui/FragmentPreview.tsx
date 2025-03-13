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
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { BuilderPreviewProperties } from '@/views/FragmentPreview/components/BuilderPreviewProperties'
import { Instance } from '@fragments/render-react'

interface FragmentPreviewProps {
  className?: string
}

export const FragmentPreview: FC<FragmentPreviewProps> = ({ className }) => {
  const { setRenderTarget } = useRenderTarget()
  const { currentFragmentId } = useBuilder()

  useEffect(() => {
    setRenderTarget(defRenderTarget.document)
  }, [])

  return (
    <FragmentPreviewProvider>
      <div className={cn(styles.root, className)} data-testid='BuilderPreview'>
        <div className={styles.body}>
          <BuilderPreviewProperties className={styles.properties} />
          <BuilderPreviewContainer>
            <Instance
              fragmentId={currentFragmentId}
              props={{
                '62218c840bd111': 0.1
              }}
            />
            {/*<Fragment fragmentId={currentFragmentId} />*/}
            {/*<Instance*/}
            {/*  fragmentId={currentFragmentId}*/}
            {/*  props={{*/}
            {/*    '141a87103cfbe': 0.1*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Instance*/}
            {/*  fragment={'18'}*/}
            {/*  props={{*/}
            {/*    '62218c840bd11': 0.4*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Fragment layerKey={documentManager.$fragment.root} />*/}
          </BuilderPreviewContainer>
        </div>
      </div>
    </FragmentPreviewProvider>
  )
}
