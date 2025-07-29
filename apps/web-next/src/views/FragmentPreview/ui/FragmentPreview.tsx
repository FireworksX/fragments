'use client'
import { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { FragmentPreviewSandbox } from '@/widgets/FragmentPreviewSandbox'
import { BuilderFragmentTabs } from '@/views/FragmentsBuilder/widgets/BuilderFragmentTabs'

interface FragmentPreviewProps {
  className?: string
}

export const FragmentPreview: FC<FragmentPreviewProps> = ({ className }) => {
  const { currentFragmentId } = useBuilder()

  return (
    <div className={cn(styles.root, className)} data-testid='BuilderPreview'>
      <BuilderFragmentTabs isPreview />
      <div className={styles.body}>
        <FragmentPreviewSandbox fragmentId={currentFragmentId} />
      </div>
    </div>
  )
}
