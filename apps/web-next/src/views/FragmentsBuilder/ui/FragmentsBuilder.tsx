'use client'
import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentsEdit } from '@/views/FragmentsEdit'
import { BuilderFragmentTabs } from '../widgets/BuilderFragmentTabs'
import { FragmentsBuilderAside } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderAside'
import { createBuilderStore } from '@/shared/store/builderStore'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { isBrowser } from '@fragments/utils'
import { useGraph } from '@graph-state/react'

const builderManager = createBuilderStore()

if (isBrowser) {
  window.builderManager = builderManager
}

export const FragmentsBuilder = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 7
      }
    })
  )

  useEffect(() => {
    builderManager.openTab({
      _type: 'FragmentModule',
      _id: 'test',
      fragment: 'Fragment:g34gherhg3g'
    })
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragEnd={builderManager.$droppable.handleDragEnd}
      onDragStart={builderManager.$droppable.handleDragStart}
    >
      <BuilderContext value={{ builderManager }}>
        <div className={styles.root}>
          <BuilderFragmentTabs />

          <div className={styles.container}>
            <FragmentsBuilderAside />
            <FragmentsEdit />
          </div>
        </div>
      </BuilderContext>
    </DndContext>
  )
}
