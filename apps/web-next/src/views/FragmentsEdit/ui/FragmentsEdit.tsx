import styles from '@/views/FragmentBuilder/ui/styles.module.css'
import { BuilderSidebar } from '@/widgets/fragmentBuilder/BuilderSidebar'
import { BuilderAssets } from '@/widgets/fragmentBuilder/BuilderAssets'
import { BuilderLayers } from '@/widgets/fragmentBuilder/BuilderLayers'
import { BuilderCanvas } from '@/widgets/fragmentBuilder/BuilderCanvas'
import { BuilderHighlight } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { DisplayBreakpoints } from '@/widgets/fragmentBuilder/DisplayBreakpoints'
import { BuilderControls } from '@/widgets/fragmentBuilder/BuilderControls'
import BuilderFragmentGrowing from '../../../widgets/fragmentBuilder/BuilderFragmentGrowing/ui/BuilderFragmentGrowing'
import { AssetsProperties } from '@/features/fragmentBuilder/AssetsProperties'
import { PropertiesTree } from '@/features/fragmentBuilder/PropertiesTree/ui/PropertiesTree'
import { BuilderPosition } from '@/widgets/fragmentBuilder/BuilderPosition'
import { BuilderSize } from '@/widgets/fragmentBuilder/BuilderSize'
import { BuilderLayout } from '@/widgets/fragmentBuilder/BuilderLayout'
import { BuilderStyles } from '@/widgets/fragmentBuilder/BuilderStyles'
import BuilderLink from '../../../widgets/fragmentBuilder/BuilderLink/ui/BuilderLink'
import { BuilderText } from '@/widgets/fragmentBuilder/BuilderText'
import { BuilderImage } from '@/widgets/fragmentBuilder/BuilderImage'
import BuilderAttributes from '../../../widgets/fragmentBuilder/BuilderAttributes/ui/BuilderAttributes'
import BuilderFragmentInstance from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/BuilderFragmentInstance'
import { BuilderFloatBar } from '@/widgets/fragmentBuilder/BuilderFloatBar'
import CreateCustomBreakpoint from '../../../widgets/modals/CreateCustomBreakpoint/ui/CreateCustomBreakpoint'
import { BuilderPopouts } from '@/widgets/fragmentBuilder/BuilderPopouts'
import StackCollector from '../../../widgets/StackCollector/ui/StackCollector'
import { StackPanelBorder } from '@/widgets/fragmentBuilder/BuilderStackPanelBorder'
import { StackPanelFill } from '@/widgets/fragmentBuilder/BuilderStackPanelFill'
import { StackPanelColorPicker } from '@/features/popouts/StackPanelColorPicker'
import { popoutNames } from '@/shared/data'
import { StackPanelCssOverride } from '@/features/popouts/StackPanelCssOverride'
import { StackSolidPaintStyle } from '@/features/popouts/StackSolidPaintStyle'
import StackStringProperty from '../../../features/popouts/StackStringProperty/ui/StackStringProperty'
import StackNumberProperty from '../../../features/popouts/StackNumberProperty/ui/StackNumberProperty'
import StackBooleanProperty from '../../../features/popouts/StackBooleanProperty/ui/StackBooleanProperty'
import StackVariableTransform from '@/features/popouts/StackVariableTransform/StackVariableTransform'
import React, { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { FragmentsEditPlaceholder } from '@/views/FragmentsEdit/components/FragmentsEditPlaceholder'
import { useFragmentsEdit } from '@/views/FragmentsEdit/hooks/useFragmentsEdit'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const FragmentsEdit = () => {
  const { documentManager, fetching } = useBuilderDocument()

  return (
    <div className={styles.root}>
      {documentManager ? (
        <>
          <div className={styles.previewContainer}>
            {/*<BuilderSidebar assetsNode={<BuilderAssets />} layersNode={<BuilderLayers />} />*/}

            <BuilderCanvas>
              <BuilderHighlight />
              <DisplayBreakpoints />
            </BuilderCanvas>

            <BuilderControls
              position='right'
              fragmentGrowingNode={<BuilderFragmentGrowing />}
              fragmentPropsNode={<AssetsProperties propertiesTree={<PropertiesTree />} />}
              positionNode={<BuilderPosition />}
              sizeNode={<BuilderSize />}
              layoutNode={<BuilderLayout />}
              stylesNode={<BuilderStyles />}
              linkNode={<BuilderLink />}
              textNode={<BuilderText />}
              imageNode={<BuilderImage />}
              attributesNode={<BuilderAttributes />}
              // cssNode={<BuilderCssOverride />}
              instancePropsNode={<BuilderFragmentInstance />}
            />

            <BuilderFloatBar />
          </div>

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
                  <StackStringProperty name={popoutNames.stackStringProperty} title='String Property' />
                  <StackNumberProperty name={popoutNames.stackNumberProperty} title='Number Property' />
                  <StackBooleanProperty name={popoutNames.stackBooleanProperty} title='Boolean Property' />
                  {/*<StackPanelCssOverrideList name='cssOverrideList' title='CSS overrides' />*/}
                  {/*<StackLoopEffect name='loopEffect' title='Loop Effect' />*/}

                  {/*<StackNumberVariable name={stackNumberVariableName} title='Number' />*/}
                  {/*<StackBooleanVariable name={stackBooleanVariableName} title='Boolean' />*/}
                  {/*<StackObjectVariable name={stackObjectVariableName} title='Object' />*/}
                  {/*<StackStringVariable name={stackStringVariableName} title='String' />*/}
                  <StackVariableTransform name={popoutNames.stackVariableTransform} title='Transform' />
                </StackCollector>
              </BuilderPopouts>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.previewContainer}>
          <FragmentsEditPlaceholder fetching={fetching} />
        </div>
      )}
    </div>
  )
}
