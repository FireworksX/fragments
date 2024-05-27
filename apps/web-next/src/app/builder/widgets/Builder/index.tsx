'use client'
import styles from './styles.module.css'
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
import { createState } from '@graph-state/core'
import isBrowser from '@/app/utils/isBrowser'

import { Layer } from '@fragments/nodes'
import { FragmentsRender } from '@fragments/render-react'
import { fragmentsPlugin } from '@fragments/fragments-plugin'
import { template } from '@/app/builder/widgets/Builder/template'
import { BuilderContext, BuilderProvider } from '@/app/builder/widgets/Builder/BuilderContext'
import Canvas from '@/app/builder/widgets/Builder/widgets/Canvas/Canvas'
import { animated } from '@react-spring/web'
import CreateCustomBreakpoint from '@/app/widgets/modals/CreateCustomBreakpoint/CreateCustomBreakpoint'
import CreateComponentModal from '@/app/widgets/modals/CreateComponentModal/CreateComponentModal'
import { ModalProvider } from '@/app/builder/widgets/Builder/ModalContext'

const graphState = createState({
  initialState: template,
  plugins: [fragmentsPlugin]
})

if (isBrowser) {
  window.graphState = graphState
}

const Builder = () => {
  const { canvas } = useContext(BuilderContext)

  return (
    <>
      <div className={styles.root}>
        <div className={styles.background}></div>
        <AsideBar className={styles.left}>
          <LeftBar />
        </AsideBar>
        <div className={styles.body}>
          <Canvas>
            <DisplayBreakpoints />
          </Canvas>

          <FloatingBar
            scale={<animated.div>{canvas?.scale.to(scale => Math.floor(scale * 100).toFixed(0))}</animated.div>}
            onAction={action => {
              switch (action) {
                // case 'addFrame':
                //   return addFrame()
                // case 'addText':
                //   return addText()
                // case 'zoomIn':
                //   return zoomIn()
                // case 'zoomOut':
                //   return zoomOut()
                case 'variables':
                  return open('componentVariables')
              }
            }}
          />

          <div className={styles.popout}>
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
  <ModalProvider>
    <BuilderProvider graphState={graphState}>
      <Builder />
    </BuilderProvider>
  </ModalProvider>
)
