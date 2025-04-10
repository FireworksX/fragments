import React, { FC, use, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { ProjectTree } from '@/widgets/fragmentBuilder/ProjectTree'
import { Container } from '@/shared/ui/Container'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { BuilderLayers } from '@/widgets/fragmentBuilder/BuilderLayers'
import cn from 'classnames'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { ProjectAssets } from '@/widgets/fragmentBuilder/ProjectAssets'
import { FragmentsEditPlaceholder } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderContent/components/FragmentsEditPlaceholder'
import { FragmentsEdit } from '@/views/FragmentsEdit'
import { FragmentPreview } from '@/views/FragmentPreview'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

interface FragmentsBuilderContentProps {
  className?: string
}

export const FragmentsBuilderContent: FC<FragmentsBuilderContentProps> = ({ className }) => {
  const { documentManager, loading } = useBuilderDocument()
  const { isPreview, currentFragmentId } = useBuilder()

  useEffect(() => {
    window.documentManager = documentManager
  }, [documentManager])

  if (!documentManager || loading || !currentFragmentId) {
    return <FragmentsEditPlaceholder fetching={loading} />
  }

  if (isPreview) {
    return <FragmentPreview />
  }

  return <FragmentsEdit />
}
