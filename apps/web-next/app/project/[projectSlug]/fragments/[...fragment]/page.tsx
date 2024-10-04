'use client'
import React, { useEffect, useMemo } from 'react'
import { createCanvasManager } from '@/builder/managers/canvasManager'
import { createState, isPartialKey } from '@graph-state/core'
import { managerPlugin, skips } from '@fragments/fragments-plugin/performance'
import { builderModes, useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { BuilderContext } from '@/builder/BuilderContext'
import loggerPlugin from '@graph-state/plugin-logger'
// import { BuilderPreview } from '@/builder/views/BuilderPreview/BuilderPreview'
import { createPreviewManager } from '@/builder/managers/previewManager'
import { useHotkeysContext } from 'react-hotkeys-hook'
import { hotKeysScope } from '@/app/hooks/hotkeys/HotKeysProvider'
import { createBuilderManager } from '@/builder/managers/builderManager'
import fragmentData from './fragment.json'
import pluginState, { skips as stateSkips } from '@fragments/plugin-state'
import pluginStateBuilder, { skips as stateBuilderSkips } from '@fragments/plugin-state-builder'
import { isBrowser } from '@fragments/utils'
import { richTextPlugin } from '../../../../store/builder/builderRichTextPlugin'
import { FragmentBuilder } from '@/views/FragmentBuilder'
import { FragmentPreview } from '@/views/FragmentPreview'

const canvasManager = createCanvasManager()
const previewManager = createPreviewManager()
const builderManager = createBuilderManager()

const template = {
  _type: 'Document',
  _id: 'gdfhfdghsf',
  children: [
    {
      _type: 'Breakpoint',
      _id: 'mobile',
      isPrimary: true,
      width: 320,
      children: [
        {
          _type: 'Frame',
          _id: '1',
          parentKey: {
            _type: '$Breakpoint',
            _id: 'mobile'
          },
          children: [
            {
              _type: 'Text',
              _id: '64bc371fa3b4c',
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              layoutSizingHorizontal: 'Fill',
              layoutSizingVertical: 'Hug',
              rotation: 0,
              opacity: 1,
              visible: true,
              parentKey: {
                _type: '$Frame',
                _id: '1'
              },
              content: '<p><span style="white-space: pre-wrap;">Смотри рейтинг букмекеров в Россииdas</span></p>',
              overrides: [
                {
                  _type: '$Text',
                  _id: '5cd1afa3fc027'
                }
              ]
            },
            {
              _type: 'Frame',
              _id: '2',
              parentKey: {
                _type: '$Frame',
                _id: '1'
              },
              children: [
                {
                  _type: 'Text',
                  _id: 'e4bcfa71c6b39',
                  x: 0,
                  y: 0,
                  width: 100,
                  height: 100,
                  layoutSizingHorizontal: 'Hug',
                  layoutSizingVertical: 'Hug',
                  rotation: 0,
                  opacity: 1,
                  visible: true,
                  parentKey: {
                    _type: '$Frame',
                    _id: '2'
                  },
                  content:
                    '<p dir="ltr"><b><strong style="text-transform: uppercase; white-space: pre-wrap;">Забрать</strong></b></p>',
                  overrides: [
                    {
                      _type: '$Text',
                      _id: 'aebabcfd750f'
                    }
                  ]
                }
              ],
              padding: -1,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              layerMode: 'flex',
              layerAlign: 'start',
              layerDirection: 'horizontal',
              layerDistribute: 'start',
              layerWrap: false,
              layerGap: 0,
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              layoutSizingHorizontal: 'Hug',
              layoutSizingVertical: 'Hug',
              rotation: 0,
              solidFill: {
                r: 93,
                g: 238,
                b: 226,
                a: 1,
                _type: 'Frame',
                _id: '2.solidFill'
              },
              borderType: 'None',
              borderWidth: 1,
              borderColor: {
                r: 13,
                g: 196,
                b: 45,
                a: 1,
                _type: 'Frame',
                _id: '2.borderColor'
              },
              cornerRadius: 24,
              topLeftRadius: 0,
              topRightRadius: 0,
              bottomLeftRadius: 0,
              bottomRightRadius: 0,
              opacity: {
                _type: 'Variable',
                _id: 'b19eb7bfeae4e',
                name: 'opacity',
                type: 'Number',
                defaultValue: 0.708,
                min: 0,
                max: 1,
                step: 0.01,
                value: null
              },
              visible: true,
              name: 'Button',
              fillType: 'Solid',
              overrides: [
                {
                  _type: '$Frame',
                  _id: '519b6b47e002'
                }
              ],
              _opacity: 1
            },
            {
              _type: 'Frame',
              _id: '0814c336cce56',
              padding: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              layerMode: 'none',
              layerAlign: 'start',
              layerDirection: 'horizontal',
              layerDistribute: 'start',
              layerWrap: false,
              layerGap: 0,
              x: 0,
              y: 0,
              width: 50,
              height: 50,
              layoutSizingHorizontal: 'Fixed',
              layoutSizingVertical: 'Fixed',
              rotation: 0,
              solidFill: {
                r: 86,
                g: 196,
                b: 187,
                a: 1,
                _type: 'Frame',
                _id: '0814c336cce56.solidFill'
              },
              fillType: 'Solid',
              borderType: 'None',
              borderWidth: 1,
              borderColor: {
                r: 13,
                g: 196,
                b: 45,
                a: 1,
                _type: 'Frame',
                _id: '0814c336cce56.borderColor'
              },
              cornerRadius: 0,
              topLeftRadius: 0,
              topRightRadius: 0,
              bottomLeftRadius: 0,
              bottomRightRadius: 0,
              opacity: 1,
              visible: true,
              parentKey: {
                _type: '$Frame',
                _id: '1'
              },
              _opacity: 1
            }
          ],
          padding: -1,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 0,
          paddingBottom: 0,
          layerMode: 'flex',
          layerAlign: 'center',
          layerDirection: 'horizontal',
          layerDistribute: 'space-between',
          layerWrap: false,
          layerGap: 10,
          x: 0,
          y: 0,
          width: 100,
          height: 80,
          layoutSizingHorizontal: 'Relative',
          layoutSizingVertical: 'Fixed',
          rotation: 0,
          solidFill: {
            r: 86,
            g: 196,
            b: 187,
            a: 1,
            _type: 'Frame',
            _id: '1.solidFill'
          },
          borderType: 'None',
          borderWidth: 1,
          borderColor: {
            r: 13,
            g: 196,
            b: 45,
            a: 1,
            _type: 'Frame',
            _id: '1.borderColor'
          },
          cornerRadius: 0,
          topLeftRadius: 0,
          topRightRadius: 0,
          bottomLeftRadius: 0,
          bottomRightRadius: 0,
          opacity: 1,
          visible: true,
          name: 'Content',
          overrides: [
            {
              _type: '$Frame',
              _id: 'd2d0cc5be2c8c'
            }
          ]
        }
      ],
      layoutSizingVertical: 'Hug',
      layoutSizingHorizontal: 'Fill',
      padding: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      layerMode: 'none',
      layerAlign: 'center',
      layerDirection: 'horizontal',
      layerDistribute: 'start',
      layerWrap: false,
      layerGap: 0,
      x: 0,
      y: 0,
      height: 100,
      rotation: 0,
      solidFill: {
        r: 232,
        g: 232,
        b: 232,
        a: 1,
        _type: 'Breakpoint',
        _id: 'mobile.solidFill'
      },
      fillType: 'Solid',
      borderType: 'None',
      borderWidth: 1,
      borderColor: {
        r: 13,
        g: 196,
        b: 45,
        a: 1,
        _type: 'Breakpoint',
        _id: 'mobile.borderColor'
      },
      cornerRadius: 10,
      topLeftRadius: 0,
      topRightRadius: 0,
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
      opacity: 1,
      visible: true,
      parentKey: {
        _type: '$Document',
        _id: 'gdfhfdghsf'
      },
      overrides: [
        {
          _type: '$Breakpoint',
          _id: 'tbalee'
        }
      ]
    }
  ],
  props: [
    {
      _type: 'Variable',
      _id: 'b19eb7bfeae4e',
      name: 'opacity',
      type: 'Number',
      defaultValue: 0.708,
      min: 0,
      max: 1,
      step: 0.01,
      value: null
    },
    {
      _type: 'Variable',
      _id: 'bgdseb7bfeae4e',
      name: 'size',
      type: 'Number',
      defaultValue: 10,
      min: 0,
      max: 100,
      step: 1,
      value: null
    },
    {
      _type: 'Variable',
      _id: '1778b033cd6bd',
      name: 'hasTrend',
      type: 'Boolean'
    },
    {
      _type: 'Variable',
      _id: '826b755e2612b',
      name: 'buttonText',
      type: 'String',
      defaultValue: 'Забрать'
    }
  ]
}

const documentManager = createState({
  initialState: template,
  plugins: [managerPlugin, richTextPlugin, loggerPlugin()],
  skip: [...skips]
})

const fragmentState = createState({
  type: 'Fragment',
  id: fragmentData._id,
  initialState: fragmentData,
  plugins: [pluginState, pluginStateBuilder, loggerPlugin({ onlyBrowser: true })],
  skip: [...stateSkips, ...stateBuilderSkips]
})

if (isBrowser) {
  window.doc = documentManager
  window.frag = fragmentState
}

const Page = () => {
  const { isEdit } = useBuilderManager()
  // const { toggleScope } = useHotkeysContext()

  // useEffect(() => {
  //   toggleScope(hotKeysScope.builder)
  // }, [])

  return isEdit ? <FragmentBuilder /> : <FragmentPreview /> //<BuilderPreview />
}

export default function () {
  return (
    <BuilderContext.Provider value={{ documentManager: fragmentState, canvasManager, previewManager, builderManager }}>
      <Page />
    </BuilderContext.Provider>
  )
}
