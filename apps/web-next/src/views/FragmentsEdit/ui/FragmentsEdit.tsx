import styles from './styles.module.css'
import { BuilderCanvas } from '@/widgets/fragmentBuilder/BuilderCanvas'
import {
  BuilderHighlight,
  CanvasTextEditorContext,
  CanvasTextEditorProvider
} from '@/widgets/fragmentBuilder/BuilderHighlight'
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
import { builderToasts, popoutNames } from '@/shared/data'
import { StackPanelCssOverride } from '@/features/popouts/StackPanelCssOverride'
import { StackSolidPaintStyle } from '@/features/popouts/StackSolidPaintStyle'
import StackVariableTransform from '@/features/popouts/StackVariableTransform/StackVariableTransform'
import { Toast } from '@/widgets/Toast'
import { ToastProvider } from '@/widgets/Toast/providers/ToastContext'
import cn from 'classnames'
import { useToast } from '@/widgets/Toast/hooks/useToast'
import { HotKeysProvider } from '@/shared/hooks/hotkeys/HotKeysProvider'
import { BuilderProvider } from '@/shared/providers/BuilderProvider'
import { BuilderFragmentTabs } from '@/views/FragmentsBuilder/widgets/BuilderFragmentTabs'
import BuilderInteractions from '@/widgets/fragmentBuilder/BuilderInteractions/ui/BuilderInteractions'
import { BuilderCssOverride } from '@/widgets/fragmentBuilder/BuilderCssOverride'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { StackStringProperty } from '@/features/popouts/StackStringProperty'
import { StackEnumProperty } from '@/features/popouts/StackEnumProperty'
import { StackLinkProperty } from '@/features/popouts/StackLinkProperty'
import { StackNumberProperty } from '@/features/popouts/StackNumberProperty'
import { StackEventProperty } from '@/features/popouts/StackEventProperty'
import { StackBooleanProperty } from '@/features/popouts/StackBooleanProperty'
import { StackColorProperty } from '@/features/popouts/StackColorProperty'
import { StackObjectProperty } from '@/features/popouts/StackObjectProperty'
import { StackInteraction } from '@/features/popouts/StackInteraction'
import { StackGoals } from '@/features/popouts/StackGoals'
import { StackCreateGoal } from '@/features/popouts/StackCreateGoal'
import { StackImageProperty } from '@/features/popouts/StackImageProperty'
import { StackImagePicker } from '@/features/popouts/StackImagePicker/ui/StackImagePicker'
import { BuilderCollection } from '@/widgets/fragmentBuilder/BuilderCollection'
import { StackArrayProperty } from '@/features/popouts/StackArrayProperty'
import { StackObjectValue } from '@/features/popouts/StackObjectValue'

const FragmentsEditInitial = () => {
  // const { setRenderTarget } = useRenderTarget()

  // useBuilderHotKeys()

  // useEffect(() => {
  //   setRenderTarget(definition.renderTarget.canvas)
  // }, [])

  return (
    <div className={styles.root}>
      <div className={styles.center}>
        <BuilderFragmentTabs />
        <div className={styles.previewContainer}>
          {/*<BuilderSidebar assetsNode={<BuilderAssets />} layersNode={<BuilderLayers />} />*/}

          <BuilderCanvas
            extendNodes={
              <>
                <BuilderFloatBar />
                <Toast
                  render={({ isOpen, Node }) => (
                    <div className={cn(styles.toast, { [styles.open]: isOpen })}>{Node}</div>
                  )}
                />
              </>
            }
          >
            <BuilderHighlight />
            <DisplayBreakpoints />
          </BuilderCanvas>

          <div className={styles.overlays}>
            <CreateCustomBreakpoint />
            <div className={styles.popoutsOverlay}>
              <BuilderPopouts>
                <StackCollector>
                  <StackPanelBorder name='border' title='Border' />
                  <StackPanelFill name='fill' title='Fill' />
                  <StackImagePicker name={popoutNames.imagePicker} title='Image' />
                  <StackImageProperty name={popoutNames.stackImageProperty} title='Image Property' />
                  <StackPanelColorPicker name={popoutNames.colorPicker} title='Color' />
                  {/*/!*<StackPanelFonts name='fonts' title='Fonts' />*!/*/}
                  <StackPanelCssOverride name='cssOverride' title='CSS override' />
                  <StackSolidPaintStyle name={popoutNames.stackSolidPaintStyle} title='Color Variable' />
                  <StackStringProperty name={popoutNames.stackStringProperty} title='String Property' />
                  <StackEnumProperty name={popoutNames.stackEnumProperty} title='Option Property' />
                  <StackLinkProperty name={popoutNames.stackLinkProperty} title='Link Property' />
                  <StackNumberProperty name={popoutNames.stackNumberProperty} title='Number Property' />
                  <StackEventProperty name={popoutNames.stackEventProperty} title='Event Property' />
                  <StackBooleanProperty name={popoutNames.stackBooleanProperty} title='Boolean Property' />
                  <StackColorProperty name={popoutNames.stackColorProperty} title='Color Property' />
                  <StackObjectProperty name={popoutNames.stackObjectProperty} title='Object Property' />
                  <StackArrayProperty name={popoutNames.stackArrayProperty} title='Array Property' />
                  <StackInteraction name={popoutNames.stackInteraction} title='Interaction' />
                  <StackGoals name={popoutNames.stackGoals} title='Goals' />
                  <StackCreateGoal name={popoutNames.stackCreateGoal} title='Create Goal' />

                  <StackObjectValue name={popoutNames.stackObjectValue} title='Object Value' />
                  {/*<StackPanelCssOverrideList name='cssOverrideList' title='CSS overrides' />*/}
                  {/*<StackLoopEffect name='loopEffect' title='Loop Effect' />*/}

                  {/*<StackNumberVariable name={stackNumberVariableName} title='Number' />*/}
                  {/*<StackBooleanVariable name={stackBooleanVariableName} title='Boolean' />*/}
                  {/*<StackStringVariable name={stackStringVariableName} title='String' />*/}
                  <StackVariableTransform name={popoutNames.stackVariableTransform} title='Transform' />
                </StackCollector>
              </BuilderPopouts>
            </div>
          </div>
        </div>
      </div>

      <BuilderControls
        position='right'
        fragmentGrowingNode={<BuilderFragmentGrowing />}
        fragmentPropsNode={<AssetsProperties propertiesTree={<PropertiesTree />} />}
        positionNode={<BuilderPosition />}
        sizeNode={<BuilderSize />}
        collectionNode={<BuilderCollection />}
        layoutNode={<BuilderLayout />}
        stylesNode={<BuilderStyles />}
        linkNode={<BuilderLink />}
        textNode={<BuilderText />}
        interactionsNode={<BuilderInteractions />}
        imageNode={<BuilderImage />}
        attributesNode={<BuilderAttributes />}
        cssNode={<BuilderCssOverride />}
        instancePropsNode={<BuilderFragmentInstance />}
      />
    </div>
  )
}

export const FragmentsEdit = withModalCollector(
  () => (
    <BuilderProvider>
      <FragmentsEditInitial />
    </BuilderProvider>
  ),
  {}
)
