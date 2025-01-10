'use client'
import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentsEdit } from '@/views/FragmentsEdit'
import { BuilderFragmentTabs } from '../widgets/BuilderFragmentTabs'
import { FragmentsBuilderAside } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderAside'
import { createBuilderStore } from '@/shared/store/builderStore'

const builderManager = createBuilderStore()

export const FragmentsBuilder = () => {
  return (
    <BuilderContext value={{ builderManager }}>
      <div className={styles.root}>
        <BuilderFragmentTabs />

        <div className={styles.container}>
          <FragmentsBuilderAside />
          <FragmentsEdit />
        </div>
      </div>
    </BuilderContext>
  )
}
