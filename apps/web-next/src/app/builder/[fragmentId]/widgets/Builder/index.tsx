'use client'
import styles from './styles.module.css'
import cn from 'classnames'
import AsideBar from '@/app/builder/widgets/Builder/components/AsideBar'
import FloatingBar from '@/app/builder/widgets/Builder/widgets/FloatingBar'
import LeftBar from '@/app/builder/widgets/Builder/widgets/LeftBar'
import RightBar from '@/app/builder/widgets/Builder/widgets/RightBar/RightBar'
import DisplayBreakpoints from '@/app/builder/widgets/Builder/widgets/DisplayBreakpoints/DisplayBreakpoints'
// import { animated } from '@react-spring/web'
import React, { useContext } from 'react'
import StackCollector from '@/app/builder/widgets/Builder/widgets/StackCollector/StackCollector'
import StackPanelBorder from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackPanelBorder/StackPanelBorder'
import StackPanelFill from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackPanelFill/StackPanelFill'
import StackPanelColorPicker from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackPanelColorPicker/StackPanelColorPicker'
import StackPanelCreateColor from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackPanelCreateColor/StackPanelCreateColor'
import StackPanelCssOverride from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackPanelCssOverride/StackPanelCssOverride'
import StackPanelCssOverrideList from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackPanelCssOverrideList/StackPanelCssOverideList'
import StackLoopEffect from '@/app/builder/widgets/Builder/widgets/StackCollector/components/StackLoopEffect/StackLoopEffect'
import isBrowser from '@/app/utils/isBrowser'
import { BuilderContext, BuilderProvider } from '@/app/builder/widgets/Builder/BuilderContext'
import Canvas from '@/app/builder/widgets/Builder/widgets/Canvas/Canvas'
import { animated } from '@react-spring/web'
import CreateCustomBreakpoint from '@/app/widgets/modals/CreateCustomBreakpoint/CreateCustomBreakpoint'
import CreateComponentModal from '@/app/widgets/modals/CreateComponentModal/CreateComponentModal'
import LayerHighlight from '@/app/builder/widgets/Builder/widgets/LayerHighlight/LayerHighlight'
import { useGraph } from '@graph-state/react'
import { popoutsStore } from '@/app/store/popouts.store'
import { useBuilder } from '@/app/builder/widgets/Builder/hooks/useBuilder'
import Tools from '@/app/builder/widgets/Builder/widgets/Tools/Tools'
import BuilderRichText from '@/app/builder/widgets/Builder/widgets/BuilderRichText/BuilderRichText'
import { builderStore } from '@/app/store/builder/builder.store'
import DisplayComponent from '@/app/builder/widgets/Builder/widgets/DisplayComponent/DisplayComponent'
import Breadcrumbs from '@/app/builder/widgets/Builder/widgets/Breadcrumbs/Breadcrumbs'

if (isBrowser) {
  window.builderStore = builderStore
}

const Builder = () => {
  const { canvas, graphState } = useContext(BuilderContext)
  const [currentPopout] = useGraph(popoutsStore, popoutsStore.getCurrent())
  const { addFrame, addText } = useBuilder()
  const [{ view }] = useGraph(graphState)

  return (
    <>
      <div
        className={cn(styles.root, {
          [styles.componentView]: view === 'component'
        })}
      >
        <div className={styles.background}></div>
        <AsideBar className={styles.left}>{<LeftBar />}</AsideBar>
        <div className={styles.body}>
          {view === 'component' && <Breadcrumbs />}

          <Tools>
            <LayerHighlight />
            <BuilderRichText />
          </Tools>

          <Canvas>{view === 'component' ? <DisplayComponent /> : <DisplayBreakpoints />}</Canvas>

          <FloatingBar
            scale={<animated.div>{canvas?.scale.to(scale => Math.floor(scale * 100).toFixed(0))}</animated.div>}
            onAction={action => {
              switch (action) {
                case 'addFrame':
                  return addFrame()
                case 'addText':
                  return addText()
                // case 'zoomIn':
                //   return zoomIn()
                // case 'zoomOut':
                //   return zoomOut()
                case 'variables':
                  return open('componentVariables')
              }
            }}
          />

          <div
            className={cn(styles.popout, {
              [styles.left]: currentPopout?.position === 'left'
            })}
          >
            <StackCollector>
              <StackPanelBorder name='border' title='Border' />
              <StackPanelFill name='fill' title='Fill' />
              <StackPanelColorPicker name='colorPicker' title='Color' />
              {/*<StackPanelFonts name='fonts' title='Fonts' />*/}
              <StackPanelCreateColor name='createColor' title='New color style' />
              <StackPanelCssOverride name='cssOverride' title='CSS override' />
              <StackPanelCssOverrideList name='cssOverrideList' title='CSS overrides' />
              <StackLoopEffect name='loopEffect' title='Loop Effect' />
            </StackCollector>
          </div>
        </div>

        <AsideBar className={styles.right}>
          <RightBar />
        </AsideBar>
      </div>

      <CreateCustomBreakpoint />
      <CreateComponentModal />
    </>
  )
}

export default () => (
  <BuilderProvider graphState={builderStore}>
    <Builder />
  </BuilderProvider>
)
