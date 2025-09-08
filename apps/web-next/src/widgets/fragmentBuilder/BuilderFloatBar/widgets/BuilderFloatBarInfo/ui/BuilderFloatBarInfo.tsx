import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import SparklesIcon from '@/shared/icons/next/sparkles.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import { capitalize } from '@/shared/utils/capitalize'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { Spinner } from '@/shared/ui/Spinner'
import { useBuilderAutoCreator } from '@/shared/hooks/fragmentBuilder/useBuilderAutoCreator'
import { useBuilderCanvasField } from '@/shared/hooks/fragmentBuilder/useBuilderCanvasField'

interface BuilderFloatBarInfoProps {
  isSaving?: boolean
  savingState?: string
  className?: string
}

export const BuilderFloatBarInfo: FC<BuilderFloatBarInfoProps> = ({ className, isSaving, savingState }) => {
  const [canvasMode] = useBuilderCanvasField('canvasMode')
  const infoIsActive = !!canvasMode && Object.keys(definition.nodes).includes(canvasMode) // || isSaving || !!savingState

  useBuilderAutoCreator()

  return (
    <div
      className={cn(styles.info, className, {
        [styles.infoActive]: infoIsActive
        // [styles.infoSuccess]: savingState === 'success'
      })}
    >
      <div className={styles.infoRow}>
        {/*{isSaving || !!savingState ? (*/}
        {/*  savingState === 'success' ? (*/}
        {/*    <>*/}
        {/*      <CheckIcon size={12} />*/}
        {/*      <span>Saved Successfully</span>*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <>*/}
        {/*      <Spinner size={12} color='var(--secondary)' />*/}
        {/*      <span>Saving...</span>*/}
        {/*    </>*/}
        {/*  )*/}
        {/*) : (*/}
        <>
          <SparklesIcon />
          <span>Select layer for create {capitalize(canvasMode)}</span>
        </>
        {/*)}*/}
      </div>
    </div>
  )
}
