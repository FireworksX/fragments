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
    children: ['Frame:d12bd11e59ee4'],
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Fixed',
    horizontalGrow: 'auto',
    verticalGrow: 'auto',
    renderTarget: 'canvas',
    renderMode: 'parent',
    name: 'BannerWidget',
    opacity: 1,
    visible: true,
    overflow: 'hidden',
    overrides: []
  },
  {
    _type: 'Frame',
    _id: 'd12bd11e59ee4',
    opacity: 1,
    visible: true,
    overflow: 'visible',
    children: ['Frame:9aac4b92b4ebf'],
    width: 200,
    height: 200,
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Fixed',
    rotation: 0,
    cornerRadius: 0,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    layerMode: 'none',
    layerAlign: 'start',
    layerDirection: 'horizontal',
    layerDistribute: 'start',
    layerGap: 0,
    borderType: 'None',
    borderWidth: 1,
    fillType: 'Solid',
    left: 0,
    top: 0,
    positionType: 'absolute',
    parent: '$$Fragment:g34gherhg3g',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    layerWrap: false,
    solidFill: 'rgba(72, 44, 196, 1)',
    overrides: []
  },
  {
    _type: 'Frame',
    _id: '9aac4b92b4ebf',
    parent: '$$Frame:d12bd11e59ee4',
    top: 34.375,
    left: 34.421875,
    positionType: 'absolute',
    width: 131.7890625,
    height: 123.65625,
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Fixed',
    visible: true,
    opacity: 1,
    overflow: 'visible',
    solidFill: 'rgb(35, 28, 69)',
    fillType: 'Solid',
    cornerRadius: 0,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    layerMode: 'none',
    layerAlign: 'start',
    layerDirection: 'horizontal',
    layerDistribute: 'start',
    layerWrap: false,
    layerGap: 0,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overrides: [],
    children: []
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
