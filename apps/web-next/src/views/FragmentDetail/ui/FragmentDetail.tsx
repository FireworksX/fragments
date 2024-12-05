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
    children: ['Text:90618556a38cb', 'Frame:abec6b6dbdb1a'],
    width: 704.96875,
    height: 99.37890625,
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Fixed',
    rotation: 0,
    cornerRadius: 0,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    layerMode: 'flex',
    layerAlign: 'center',
    layerDirection: 'horizontal',
    layerDistribute: 'space-between',
    layerGap: 25,
    borderType: 'None',
    borderWidth: 1,
    fillType: 'Solid',
    left: 0,
    top: 0,
    positionType: 'absolute',
    parent: '$$Fragment:g34gherhg3g',
    padding: null,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 30,
    layerWrap: false,
    solidFill: 'rgb(69, 69, 69)',
    overrides: [],
    name: 'card'
  },
  {
    _type: 'Text',
    _id: '90618556a38cb',
    overrides: [],
    children: [],
    parent: '$$Frame:d12bd11e59ee4',
    top: 29.73828125,
    left: 24.33984375,
    positionType: 'relative',
    width: 383.91015625,
    height: 110.32421875,
    layoutSizingHorizontal: 'Fill',
    layoutSizingVertical: 'Hug',
    visible: true,
    opacity: 1,
    overflow: 'visible',
    content: '<p><span style="font-size: 16px">Перейди в телеграми и получи новогодний приз</span></p>',
    whiteSpace: 'normal'
  },
  {
    _type: 'Frame',
    _id: 'abec6b6dbdb1a',
    overrides: [],
    children: ['Text:6260c22d5005b'],
    parent: '$$Frame:d12bd11e59ee4',
    top: 70.3671875,
    left: 552.22265625,
    positionType: 'relative',
    width: 166.6015625,
    height: 56.5078125,
    layoutSizingHorizontal: 'Hug',
    layoutSizingVertical: 'Hug',
    visible: true,
    opacity: 1,
    overflow: 'visible',
    solidFill: 'rgba(86, 177, 196, 1)',
    fillType: 'Solid',
    cornerRadius: 10,
    topLeftRadius: 0,
    topRightRadius: 0,
    bottomLeftRadius: 0,
    bottomRightRadius: 0,
    layerMode: 'flex',
    layerAlign: 'start',
    layerDirection: 'horizontal',
    layerDistribute: 'start',
    layerWrap: false,
    layerGap: 0,
    padding: null,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    name: 'Button'
  },
  {
    _type: 'Text',
    _id: '6260c22d5005b',
    overrides: [],
    children: [],
    parent: '$$Frame:abec6b6dbdb1a',
    top: 0,
    left: 0,
    positionType: 'relative',
    width: 200,
    height: 200,
    layoutSizingHorizontal: 'Hug',
    layoutSizingVertical: 'Hug',
    visible: true,
    opacity: 1,
    overflow: 'hidden',
    content: 'Перейти',
    whiteSpace: 'normal'
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
