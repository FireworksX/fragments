import React, { FC, use } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import LogoIcon from '@/shared/icons/next/logo.svg'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useDroppable } from '@dnd-kit/core'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { useProjectFiles } from '@/shared/hooks/useProjectFiles'
import { useGraphEffect } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { draggableTypes } from '@/shared/store/builderStore/plugins/droppablePlugin'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

interface FragmentsEditPlaceholderProps {
  fetching?: boolean
  className?: string
}

export const FragmentsEditPlaceholder: FC<FragmentsEditPlaceholderProps> = ({ className, fetching }) => {
  const { builderManager } = use(BuilderContext)
  const { setNodeRef, isOver } = useDroppable({
    id: 'builderPlaceholder',
    data: { area: 'builderPlaceholder' }
  })
  const { createProjectFragment, loading } = useProjectFiles()
  const { openFragment } = useBuilder()
  const { open: openModal } = useModal()

  useGraphEffect(builderManager, builderManager.$droppable.builderPlaceholderDroppableKey, nextValue => {
    if (nextValue.active?.type === draggableTypes.fragmentProjectItem) {
      openFragment(nextValue.active.id)
    }
  })

  const handleCreateFragment = async () => {
    openModal(modalNames.createFragment, {
      onCreate: async (name, templateId) => {
        const response = await createProjectFragment({
          templateId,
          variables: {
            name: name ?? 'Untitled'
          }
        })

        if (response.id) {
          openFragment(response?.id)
        }
      }
    })
  }

  return (
    <>
      <div className={cn(styles.root, className, { [styles.over]: isOver })} ref={setNodeRef}>
        <LogoIcon width={40} height={40} />

        {fetching ? (
          <Spinner color='var(--text-color-accent-secondary)' />
        ) : (
          <div
            className={styles.content}
            style={{
              opacity: isOver ? 0 : 1
            }}
          >
            <div>
              <h1 className={styles.title}>No such file</h1>
              <p className={styles.description}>Select fragment form project or create new.</p>
            </div>
            <Button loading={loading.createFragmentLoading} onClick={handleCreateFragment}>
              Create Fragment
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
