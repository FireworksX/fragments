'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { BuilderPreviewContainer } from '@/widgets/fragmentBuilder/BuilderPreviewContainer'
import { FragmentInstance } from '@/widgets/renderer/FragmentInstance/FragmentInstance'

interface FragmentPreviewProps {
  className?: string
}

export const FragmentPreview: FC<FragmentPreviewProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)

  return (
    <div className={cn(styles.root, className)} data-testid='BuilderPreview'>
      <BuilderPreviewContainer>
        <FragmentInstance documentManager={documentManager} />
      </BuilderPreviewContainer>
    </div>
  )
}
