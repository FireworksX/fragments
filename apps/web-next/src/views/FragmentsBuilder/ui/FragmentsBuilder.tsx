'use client'
import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentsEdit } from '@/views/FragmentsEdit'
import { useParams } from 'next/navigation'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { createCanvasManager } from '@/views/FragmentDetail/lib/canvasManager'
import { createPreviewManager } from '@/views/FragmentDetail/lib/previewManager'
import { createBuilderManager } from '@/views/FragmentDetail/lib/builderManager'
import { createState } from '@graph-state/core'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import loggerPlugin from '@graph-state/plugin-logger'
import fragmentData from '@/views/FragmentDetail/fragment.json'
import { isBrowser } from '@fragments/utils'
import fragmentButtonData from '@/views/FragmentDetail/button.fragment.json'
import { BuilderFragmentTabs } from '../widgets/BuilderFragmentTabs'
import { ProjectTree } from '@/widgets/fragmentBuilder/ProjectTree'
import { AsideBar } from '@/shared/ui/AsideBar'
import { FragmentsBuilderAside } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderAside'
import { useGraph } from '@graph-state/react'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'

const canvasManager = createCanvasManager()
const previewManager = createPreviewManager()
const builderManager = createBuilderManager()

const nextFragmentState = createState({
  initialState: {},
  plugins: [pluginFragmentSpring('Fragment:g34gherhg3g'), loggerPlugin({ onlyBrowser: true })],
  skip: [...stateSkips, ...skips]
})

export const stateAlias = '$fragment'

nextFragmentState.fragment = 'Fragment:g34gherhg3g'

nextFragmentState.$fragment.applySnapshot(fragmentData)

if (isBrowser) {
  window.nextFrag = nextFragmentState
  window.builderManager = builderManager

  setTimeout(() => {
    nextFragmentState.$fragment.applySnapshot(fragmentButtonData)
  }, 2000)
}

export const FragmentsBuilder = () => {
  const { fragmentSlug } = useParams()
  const [, view] = fragmentSlug || []
  const { activeTab } = useBuilderTabs(builderManager)

  useEffect(() => {
    nextFragmentState[stateAlias].setRenderTarget('canvas')
  }, [view])

  return (
    <BuilderContext.Provider value={{ documentManager: null, canvasManager, previewManager, builderManager }}>
      <div className={styles.root}>
        <BuilderFragmentTabs />

        <div className={styles.container}>
          <FragmentsBuilderAside />
          <FragmentsEdit />
        </div>
      </div>
    </BuilderContext.Provider>
  )
}
