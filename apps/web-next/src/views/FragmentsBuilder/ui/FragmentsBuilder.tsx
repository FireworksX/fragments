'use client'
import styles from './styles.module.css'
import { BuilderFragmentTabs } from '../widgets/BuilderFragmentTabs'
import { FragmentsBuilderAside } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderAside'
import { createBuilderStore } from '@/shared/store/builderStore'
import { isBrowser } from '@fragmentsx/utils'
import { FragmentBuilderProvider } from '@/views/FragmentsBuilder/lib/FragmentBuilderProvider'
import { FragmentsBuilderContent } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderContent'
import { useGlobalManager } from '@fragmentsx/render-suite'
import { createCanvasStore } from '@/shared/store/canvasStore'

const builderManager = createBuilderStore()
const canvasManager = createCanvasStore()

if (isBrowser) {
  window.builderManager = builderManager
  window.canvasManager = canvasManager
}

// const context = createGlobalContext()

export const FragmentsBuilder = () => {
  const globalManager = useGlobalManager()

  if (!globalManager) return null

  return (
    <>
      <FragmentBuilderProvider builderManager={builderManager} canvasManager={canvasManager}>
        <div className={styles.root}>
          <div className={styles.container}>
            <FragmentsBuilderAside />
            <div className={styles.content}>
              <FragmentsBuilderContent />
            </div>
          </div>
        </div>
      </FragmentBuilderProvider>
    </>
  )
}
