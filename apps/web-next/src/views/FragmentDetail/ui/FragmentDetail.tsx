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
import pluginState, { skips as stateSkips } from '@fragments/plugin-state'
import pluginStateBuilder, { skips as stateBuilderSkips } from '@fragments/plugin-state-builder'
import { generateId, isBrowser } from '@fragments/utils'
import { useParams } from 'next/navigation'
import pluginFragment from '@fragments/plugin-fragment'
import pluginFragmentSpring from '@fragments/plugin-fragment-spring'

const canvasManager = createCanvasManager()
const previewManager = createPreviewManager()
const builderManager = createBuilderManager()

const nextFragmentState = createState({
  initialState: {},
  plugins: [pluginFragmentSpring('Fragment:g34gherhg3g'), loggerPlugin({ onlyBrowser: true })],
  skip: [...stateSkips, ...stateBuilderSkips]
})

export const stateAlias = '$fragmentSpring'

nextFragmentState.fragment = 'Fragment:g34gherhg3g'

nextFragmentState.$fragmentSpring.applySnapshot([
  {
    _type: 'Fragment',
    _id: 'g34gherhg3g',
    width: null,
    height: null,
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Fixed',
    solidPainStyles: [],
    properties: [],
    horizontalGrow: 'auto',
    verticalGrow: 'auto',
    renderTarget: 'canvas',
    renderMode: 'parent',
    name: 'BannerWidget',
    children: ['Frame:d12bd11e59ee4'],
    opacity: 1,
    visible: true,
    overflow: 'hidden',
    currentBreakpoint: null
  },
  {
    _type: 'Frame',
    _id: 'd12bd11e59ee4',
    opacity: 1,
    visible: true,
    overflow: 'hidden',
    width: 195.634482249157,
    height: 193.0859375,
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Hug',
    rotation: 0,
    cornerRadius: 5,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    layerMode: 'flex',
    layerAlign: 'start',
    layerDirection: 'vertical',
    layerDistribute: 'start',
    layerGap: 21,
    borderType: 'None',
    borderWidth: 1,
    fillType: 'Solid',
    left: 125.40625,
    top: 68.26953125000001,
    positionType: 'absolute',
    parent: '$$Fragment:g34gherhg3g',
    name: null,
    children: [],
    aspectRatio: null,
    zIndex: null,
    padding: null,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 10,
    layerWrap: false,
    borderColor: null,
    imageFill: null,
    imageFillScaleMode: null,
    overrides: []
  }
])

const fragmentState = createState({
  initialState: {
    fragment: 'Fragment:g34gherhg3g',
    dependencies: []
  },
  plugins: [pluginState, pluginStateBuilder, loggerPlugin({ onlyBrowser: true })],
  skip: [...stateSkips, ...stateBuilderSkips]
})

fragmentState.applyFragmentModule(fragmentData)
// fragmentState.applyState(fragmentButtonData)

if (isBrowser) {
  window.frag = fragmentState
  window.nextFrag = nextFragmentState

  setTimeout(() => {
    fragmentState.applyFragmentModule(fragmentButtonData)
  }, 5000)
}

interface FragmentDetailProps {
  builder?: ReactNode
  preview?: ReactNode
}

export const FragmentDetail: FC<FragmentDetailProps> = ({ builder, preview }) => {
  const { fragmentSlug } = useParams()
  const [, view] = fragmentSlug || []

  useEffect(() => {
    fragmentState.resolve(fragmentState.fragment).setRenderTarget(view === 'edit' ? 'canvas' : 'document')
  }, [view])

  return (
    <BuilderContext.Provider
      value={{ documentManager: nextFragmentState, canvasManager, previewManager, builderManager }}
    >
      {view === 'edit' ? builder : preview}
    </BuilderContext.Provider>
  )
}
