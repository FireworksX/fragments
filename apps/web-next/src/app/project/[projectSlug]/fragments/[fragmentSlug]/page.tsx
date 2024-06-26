'use client'
import React, { useEffect, useMemo } from 'react'
import styles from './styles.module.css'
import { PageHeading } from '@/app/components/PageHeading/PageHeading'
import BuilderCanvas from '@/builder/BuilderCanvas/BuilderCanvas'
import { createCanvasManager } from '@/builder/BuilderCanvas/canvasManager'
import { useGraph } from '@graph-state/react'
import { animated, SpringValue, useSpring, useSpringValue } from '@react-spring/web'
import FloatingBar from '@/builder/components/FloatingBar'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import Button from '@/app/components/Button'
import DisplayBreakpoints from '@/builder/DisplayBreakpoints/DisplayBreakpoints'
import { FragmentsRender } from '@fragments/render-react'
import { createState } from '@graph-state/core'
import { template } from '@/app/builder/[fragmentId]/widgets/Builder/template'
import { managerPlugin, documentPlugin } from '@fragments/fragments-plugin/performance'
import { Layer } from '@fragments/nodes'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/builder/Sidebar'
import Controls from '@/builder/Controls/Controls'
import GrabCursor from '@/app/svg/grab-cursor.svg'
import DefaultCursor from '@/app/svg/default-cursor.svg'
import Lightning from '@/app/svg/lightning.svg'
import { builderModes, useBuilderManager } from '@/builder/hooks/useBuilderManager'
import dynamic from 'next/dynamic'
import { useRendererHandlers } from '@/builder/hooks/useRendererHandlers'
import Tools from '@/builder/Tools/Tools'
import LayerHighlight from '@/builder/LayerHighlight/LayerHighlight'
import { BuilderContext } from '@/builder/BuilderContext'
import { isInstanceOf } from '@graph-state/checkers'
import loggerPlugin from '@graph-state/plugin-logger'

const canvasManager = createCanvasManager()

const documentManager = createState({
  initialState: template,
  plugins: [managerPlugin, documentPlugin, loggerPlugin()],
  skip: [isInstanceOf(SpringValue)]
})

window.doc = documentManager

const BuilderModals = dynamic(() => import('@/builder/BuilderModals/BuilderModals').then(m => m.BuilderModals), {
  ssr: false
})

const BuilderPopouts = dynamic(() => import('@/builder/BuilderPopouts/BuilderPopouts').then(m => m.BuilderPopouts), {
  ssr: false
})

export default function () {
  const { isEdit, changeMode, focus } = useBuilderManager()
  const [canvas] = useGraph(canvasManager)
  const { handleClick } = useRendererHandlers()

  return (
    <BuilderContext.Provider value={{ documentManager, canvasManager }}>
      <div className={styles.root}>
        <div className={styles.previewContainer}>
          <Sidebar isOpen={isEdit} />

          <BuilderCanvas>
            <LayerHighlight />
            <DisplayBreakpoints
              documentManager={documentManager}
              renderer={screenKey => (
                <FragmentsRender
                  FragmentNode={Layer}
                  graphState={documentManager}
                  layerKey={screenKey}
                  onClick={handleClick}
                />
              )}
            />
          </BuilderCanvas>
          <Controls isOpen={isEdit} position='right' documentManager={documentManager} />

          <FloatingBar
            actions={[
              {
                kind: 'action',
                hidden: !isEdit,
                icon: <DefaultCursor width={20} height={20} />,
                onClick: () => undefined
              },
              {
                kind: 'action',
                hidden: !isEdit,
                icon: <GrabCursor width={20} height={20} />,
                onClick: () => undefined
              },
              { kind: 'action', hidden: !isEdit, icon: <Lightning width={20} height={20} />, onClick: () => undefined },
              {
                kind: 'component',
                component: (
                  <SelectMimicry>
                    <animated.div>
                      {canvas.scale.to(scale =>
                        Math.floor(scale * 100)
                          .toFixed(0)
                          .concat('%')
                      )}
                    </animated.div>
                  </SelectMimicry>
                )
              },
              {
                kind: 'component',
                hidden: isEdit,
                component: <Button onClick={() => changeMode(builderModes.edit)}>Edit</Button>
              },
              { kind: 'delimiter', hidden: !isEdit },
              {
                kind: 'component',
                hidden: !isEdit,
                component: <Button>Publish</Button>
              }
            ]}
          />
        </div>

        {isEdit && (
          <div className={styles.overlays}>
            <BuilderModals />
            <div className={styles.popoutsOverlay}>
              <BuilderPopouts documentManager={documentManager} />
            </div>
          </div>
        )}
      </div>
    </BuilderContext.Provider>
  )
}
