import React, { FC, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Sidebar from '@/builder/views/BuilderEditable/widgets/BuilderSidebar/BuilderSidebar'
import LayerHighlight from '@/builder/LayerHighlight/LayerHighlight'
import DisplayBreakpoints from '@/builder/views/BuilderEditable/widgets/DisplayBreakpoints/DisplayBreakpoints'
import { Layer } from '@/builder/renderer/Layer/Layer'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { BuilderModals } from '@/builder/views/BuilderEditable/widgets/BuilderModals/BuilderModals'
import { BuilderPopouts } from '@/builder/views/BuilderEditable/widgets/BuilderPopouts/BuilderPopouts'
import { BuilderContext } from '@/builder/BuilderContext'
import { BuilderTextEditorComposer } from '@/builder/views/BuilderEditable/widgets/BuilderTextEditor/BuilderTextEditorComposer'
import BuilderCanvas from '@/builder/views/BuilderEditable/widgets/BuilderCanvas/BuilderCanvas'
import { BuilderTextEditor } from '@/builder/views/BuilderEditable/widgets/BuilderTextEditor/BuilderTextEditor'
import BuilderControls from '@/builder/views/BuilderEditable/widgets/BuilderControls/BuilderControls'
import { BuilderFloatBar } from '@/builder/views/BuilderEditable/widgets/BuilderFloatBar/BuilderFloatBar'
import { useBuilderHotKeys } from '@/app/hooks/hotkeys/useBuilderHotKeys'
import { builderVariableTransforms, builderVariableType } from '@fragments/fragments-plugin'
import { SpringValue, animated } from '@react-spring/web'
import Panel from '@/builder/components/Panel/Panel'
import Slider from '@/app/components/Slider/Slider'
import data from '@/app/project/[projectSlug]/fragments/[...fragment]/data.json'
import { Fragment, Layer as LayerRenderer, createContext } from '@fragments/renderer/performance'
import { Fragment as ReactFrag } from '@fragments/renderer-react/performance'
import isBrowser from '@/app/utils/isBrowser'

interface BuilderEditableProps {
  className?: string
}

const globalContext = createContext()
const fragmentNode = Fragment({ globalContext, document: data })
const layerNode = LayerRenderer({ globalContext, document: data.children[0] })

if (isBrowser) {
  window.globalContext = globalContext
}

export const BuilderEditable: FC<BuilderEditableProps> = ({ className }) => {
  const { isEdit, focus } = useBuilderManager()
  const { canvasManager, documentManager } = useContext(BuilderContext)
  useBuilderHotKeys()

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        canvasManager.scrollAndZoomIntoView(focus)
        fragmentNode.render(document.querySelector('#dd'))
        console.log(layerNode)
        layerNode.render(document.querySelector('#layer'))
      }, 1000)
    }
  }, [])

  return (
    <BuilderTextEditorComposer>
      <div className={styles.root}>
        <div className={styles.previewContainer}>
          <Sidebar isOpen={isEdit} />

          <BuilderCanvas>
            <div id='dd'></div>
            <h1>fsdg</h1>
            <div id='layer'></div>
            <ReactFrag context={globalContext} document={data} />
            <BuilderTextEditor />
            <LayerHighlight />
            <DisplayBreakpoints renderer={(screenKey, props) => <Layer layerKey={screenKey} {...props} />} />
          </BuilderCanvas>
          <BuilderControls isOpen={isEdit} position='right' />

          <BuilderFloatBar />
        </div>

        {isEdit && (
          <div className={styles.overlays}>
            <BuilderModals />
            <div className={styles.popoutsOverlay}>
              <BuilderPopouts />
            </div>
          </div>
        )}
      </div>
    </BuilderTextEditorComposer>
  )
}
