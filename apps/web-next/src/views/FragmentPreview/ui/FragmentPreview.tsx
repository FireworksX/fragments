'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentInstance } from '@/widgets/renderer/FragmentInstance/FragmentInstance'
import { Fragment } from '@/widgets/renderer/Fragment/Fragment'
import { AsideBar } from '@/shared/ui/AsideBar'
import BuilderFragmentInstance from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/BuilderFragmentInstance'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { BuilderPreviewContainer } from '../components/BuilderPreviewContainer'
import { FragmentPreviewContext, FragmentPreviewProvider } from '@/views/FragmentPreview/lib/FragmentPreviewContext'

interface FragmentPreviewProps {
  className?: string
}

export const FragmentPreview: FC<FragmentPreviewProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()

  return (
    <FragmentPreviewProvider>
      <div className={cn(styles.root, className)} data-testid='BuilderPreview'>
        <div className={styles.body}>
          <BuilderPreviewContainer>
            <Fragment layerKey={documentManager.fragment} />
          </BuilderPreviewContainer>
        </div>
      </div>
    </FragmentPreviewProvider>
  )
}
