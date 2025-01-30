import React, { FC, use } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import LogoIcon from '@/shared/icons/next/logo.svg'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useDroppable } from '@dnd-kit/core'
import { useModal } from '@/shared/hooks/useModal'
import { modalNames } from '@/shared/data'
import { useProjectTree } from '@/shared/hooks/useProjectTree'
import CreateFragmentModal from '@/widgets/modals/CreateFragmentModal/ui/CreateFragmentModal'
import { useGraphEffect } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { nodes } from '@fragments/plugin-fragment'
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

  const { openModal, updateContext, closeModal } = useModal()
  const { createProjectFragment, projectSlug } = useProjectTree()
  const { openFragment } = useBuilder()

  useGraphEffect(builderManager, builderManager.$droppable.builderPlaceholderDroppableKey, nextValue => {
    if (nextValue.active?.type === draggableTypes.fragmentProjectItem) {
      openFragment(nextValue.active.id)
    }
  })

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
            <Button
              onClick={() =>
                openModal(modalNames.createFragment, {
                  creating: false,
                  onCreate: async ({ name }) => {
                    updateContext({ creating: true })

                    await createProjectFragment({
                      variables: {
                        projectSlug,
                        name,
                        parentId: null
                      }
                    })

                    updateContext({ creating: false })
                    closeModal()
                  }
                })
              }
            >
              Create Fragment
            </Button>
          </div>
        )}
      </div>
      <CreateFragmentModal />
    </>
  )
}
