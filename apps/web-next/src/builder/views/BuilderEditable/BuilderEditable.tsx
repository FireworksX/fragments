import React, { FC, useContext, useEffect } from 'react'
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

interface BuilderEditableProps {
  className?: string
}

export const BuilderEditable: FC<BuilderEditableProps> = ({ className }) => {
  const { isEdit, focus } = useBuilderManager()
  const { canvasManager } = useContext(BuilderContext)
  useBuilderHotKeys()

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        canvasManager.scrollAndZoomIntoView(focus)
      }, 1000)
    }
  }, [])

  return (
    <BuilderTextEditorComposer>
      <div className={styles.root}>
        <div className={styles.previewContainer}>
          <Sidebar isOpen={isEdit} />

          <BuilderCanvas>
            <BuilderTextEditor />
            <LayerHighlight />
            <DisplayBreakpoints
              renderer={(screenKey, handleClick) => <Layer layerKey={screenKey} onClick={handleClick} />}
            />
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
