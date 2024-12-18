'use client'
import React, { FC, ReactNode, useEffect, useMemo } from 'react'
import { createCanvasManager } from '../lib/canvasManager'
import { createPreviewManager } from '../lib/previewManager'
import { createBuilderManager } from '../lib/builderManager'
import { createState } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import loggerPlugin from '@graph-state/plugin-logger'
// import { BuilderPreview } from '@/builder/views/BuilderPreview/BuilderPreview'
// import { useHotkeysContext } from 'react-hotkeys-hook'
// import { hotKeysScope } from '@/app/hooks/hotkeys/HotKeysProvider'
import fragmentData from '../fragment.json'
import fragmentButtonData from '../button.fragment.json'
import pluginState, { skips as stateSkips } from '@fragments/plugin-fragment-spring'
import { generateId, isBrowser } from '@fragments/utils'
import { useParams } from 'next/navigation'
import pluginFragment from '@fragments/plugin-fragment'
import pluginFragmentSpring, { skips } from '@fragments/plugin-fragment-spring'

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

  setTimeout(() => {
    nextFragmentState.$fragment.applySnapshot(fragmentButtonData)
  }, 2000)
}

interface FragmentDetailProps {
  builder?: ReactNode
  preview?: ReactNode
}

export const FragmentDetail: FC<FragmentDetailProps> = ({ builder, preview }) => {
  const { fragmentSlug } = useParams()
  const [, view] = fragmentSlug || []

  useEffect(() => {
    nextFragmentState[stateAlias].setRenderTarget(view === 'edit' ? 'canvas' : 'document')
  }, [view])

  return (
    <BuilderContext.Provider
      value={{ documentManager: nextFragmentState, canvasManager, previewManager, builderManager }}
    >
      {view === 'edit' ? builder : preview}
    </BuilderContext.Provider>
  )
}
