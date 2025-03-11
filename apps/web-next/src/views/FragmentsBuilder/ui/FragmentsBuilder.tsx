'use client'
import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentsEdit } from '@/views/FragmentsEdit'
import { BuilderFragmentTabs } from '../widgets/BuilderFragmentTabs'
import { FragmentsBuilderAside } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderAside'
import { createBuilderStore } from '@/shared/store/builderStore'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { isBrowser } from '@fragments/utils'
import { useGraph, useGraphEffect } from '@graph-state/react'
import { FragmentBuilderProvider } from '@/views/FragmentsBuilder/lib/FragmentBuilderProvider'
import { FragmentsBuilderContent } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderContent'
import { Fragment } from '@fragments/render-react'
import { createGlobalManager, useFragmentManager } from '@fragments/render-core'

const builderManager = createBuilderStore()

const globalManager = createGlobalManager()

if (isBrowser) {
  window.builderManager = builderManager
  window.globalManager = globalManager
}

// const context = createGlobalContext()

export const FragmentsBuilder = () => {
  return (
    <>
      <FragmentBuilderProvider builderManager={builderManager} globalManager={globalManager}>
        <div className={styles.root}>
          <div className={styles.container}>
            <FragmentsBuilderAside />
            <div className={styles.content}>
              <BuilderFragmentTabs />
              <FragmentsBuilderContent />
            </div>
          </div>
        </div>
      </FragmentBuilderProvider>
    </>
  )
}
