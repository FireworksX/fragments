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
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'
import { CreateNewFragment } from '@/widgets/modals/CreateNewFragment'

interface FragmentsBuilderContentProps {
  className?: string
}

const FragmentsBuilderContentInternal: FC<FragmentsBuilderContentProps> = ({ className }) => {
  const { documentManager, loading } = useBuilderDocument()
  const { isPreview, currentFragmentId } = useBuilder()

  useEffect(() => {
    window.documentManager = documentManager
  }, [documentManager])

  if (!documentManager || loading || !currentFragmentId) {
    return <FragmentsEditPlaceholder fetching={loading && !!currentFragmentId} />
  }

  if (isPreview) {
    return <FragmentPreview />
  }

  return <FragmentsEdit />
}

export const FragmentsBuilderContent = withModalCollector(FragmentsBuilderContentInternal, {
  [modalNames.createFragment]: <CreateNewFragment />
})
