'use client'
import styles from './styles.module.css'
import { BuilderFragmentTabs } from '../widgets/BuilderFragmentTabs'
import { FragmentsBuilderAside } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderAside'
import { createBuilderStore } from '@/shared/store/builderStore'
import { isBrowser } from '@fragments/utils'
import { FragmentBuilderProvider } from '@/views/FragmentsBuilder/lib/FragmentBuilderProvider'
import { FragmentsBuilderContent } from '@/views/FragmentsBuilder/widgets/FragmentsBuilderContent'

const builderManager = createBuilderStore()

if (isBrowser) {
  window.builderManager = builderManager
}

// const context = createGlobalContext()

export const FragmentsBuilder = () => {
  return (
    <>
      <FragmentBuilderProvider builderManager={builderManager}>
        <div className={styles.root}>
          <div className={styles.container}>
            <FragmentsBuilderAside />
            <div className={styles.content}>
              <BuilderFragmentTabs />
              <FragmentsBuilderContent />
            </div>
          </div>
        </div>
      </FragmentBuilderProvider>
    </>
  )
}
