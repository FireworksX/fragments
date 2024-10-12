'use client'
import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { BuilderHighlight } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { BuilderHighlightHeaders } from '@/widgets/fragmentBuilder/BuilderHighlightHeaders'
import { BuilderCanvas } from '@/widgets/fragmentBuilder/BuilderCanvas'
import { BuilderSidebar } from '@/widgets/fragmentBuilder/BuilderSidebar'
import { BuilderAssets } from '@/widgets/fragmentBuilder/BuilderAssets'
import { BuilderLayers } from '@/widgets/fragmentBuilder/BuilderLayers'
import { BuilderVariables } from '@/widgets/fragmentBuilder/BuilderVariables'
import { BuilderFloatBar } from '@/widgets/fragmentBuilder/BuilderFloatBar'
import { BuilderTextEditor } from '@/widgets/fragmentBuilder/BuilderTextEditor'
import CreateCustomBreakpoint from '@/widgets/modals/CreateCustomBreakpoint/ui/CreateCustomBreakpoint'
import { BuilderControls } from '@/widgets/fragmentBuilder/BuilderControls'
import { BuilderPosition } from '@/widgets/fragmentBuilder/BuilderPosition'
import { BuilderSize } from '@/widgets/fragmentBuilder/BuilderSize'
import { BuilderLayout } from '@/widgets/fragmentBuilder/BuilderLayout'
import { BuilderStyles } from '@/widgets/fragmentBuilder/BuilderStyles'
import { BuilderText } from '@/widgets/fragmentBuilder/BuilderText'
import { BuilderCssOverride } from '@/widgets/fragmentBuilder/BuilderCssOverride'
import StackCollector from '@/widgets/StackCollector/ui/StackCollector'
import { BuilderPopouts } from '@/widgets/fragmentBuilder/BuilderPopouts'
import { StackPanelBorder } from '@/widgets/fragmentBuilder/BuilderStackPanelBorder'
import { StackPanelFill } from '@/widgets/fragmentBuilder/BuilderStackPanelFill'
import { StackPanelColorPicker } from '@/features/popouts/StackPanelColorPicker'
import { StackPanelCreateColor } from '@/features/popouts/StackPanelCreateColor'
import { StackPanelCssOverride } from '@/features/popouts/StackPanelCssOverride'
import { DisplayBreakpoints } from '@/widgets/fragmentBuilder/DisplayBreakpoints'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { BuilderTextEditorComposer } from '@/features/fragmentBuilder/BuilderTextEditor'
import { StackSolidPaintStyle } from '@/features/popouts/StackSolidPaintStyle'
import { popoutNames } from '@/shared/data'

interface FragmentBuilderProps {
  className?: string
}

export const FragmentBuilder: FC<FragmentBuilderProps> = ({ className }) => {
  const { isEdit, focus } = useBuilderManager()
  const { canvasManager, documentManager } = useContext(BuilderContext)
  // useBuilderHotKeys()

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
          <BuilderSidebar
            isOpen={isEdit}
            assetsNode={<BuilderAssets />}
            layersNode={<BuilderLayers />}
            variablesNode={<BuilderVariables />}
          />

          <BuilderCanvas>
            <BuilderTextEditor />
            <BuilderHighlight>
              <BuilderHighlightHeaders />
            </BuilderHighlight>

            <DisplayBreakpoints />
          </BuilderCanvas>
          <BuilderControls
            isOpen={isEdit}
            position='right'
            positionNode={<BuilderPosition />}
            sizeNode={<BuilderSize />}
            layoutNode={<BuilderLayout />}
            stylesNode={<BuilderStyles />}
            textNode={<BuilderText />}
            cssNode={<BuilderCssOverride />}
          />

          <BuilderFloatBar />
        </div>

        {isEdit && (
          <div className={styles.overlays}>
            <CreateCustomBreakpoint />
            <div className={styles.popoutsOverlay}>
              <BuilderPopouts>
                <StackCollector>
                  <StackPanelBorder name='border' title='Border' />
                  <StackPanelFill name='fill' title='Fill' />
                  <StackPanelColorPicker name={popoutNames.colorPicker} title='Color' />
                  {/*/!*<StackPanelFonts name='fonts' title='Fonts' />*!/*/}
                  <StackPanelCssOverride name='cssOverride' title='CSS override' />
                  <StackSolidPaintStyle name={popoutNames.stackSolidPaintStyle} title='Color Variable' />
                  {/*<StackPanelCssOverrideList name='cssOverrideList' title='CSS overrides' />*/}
                  {/*<StackLoopEffect name='loopEffect' title='Loop Effect' />*/}

                  {/*<StackNumberVariable name={stackNumberVariableName} title='Number' />*/}
                  {/*<StackBooleanVariable name={stackBooleanVariableName} title='Boolean' />*/}
                  {/*<StackObjectVariable name={stackObjectVariableName} title='Object' />*/}
                  {/*<StackStringVariable name={stackStringVariableName} title='String' />*/}
                  {/*<StackVariableTransform name={stackVariableTransformName} title='Transform' />*/}
                </StackCollector>
              </BuilderPopouts>
            </div>
          </div>
        )}
      </div>
    </BuilderTextEditorComposer>
  )
}
