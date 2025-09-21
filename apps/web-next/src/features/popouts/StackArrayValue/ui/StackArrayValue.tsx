import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph, GraphValue, GraphValues } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { popoutNames } from '@/shared/data'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { undefined } from 'zod'
import { cleanGraph, noop, omit } from '@fragmentsx/utils'
import { keyOfEntity } from '@graph-state/core'
import { Touchable } from '@/shared/ui/Touchable'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import { Button } from '@/shared/ui/Button'
import { nextTick } from '@/shared/utils/nextTick'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

interface StackArrayValueProps {
  className?: string
}

export const StackArrayValue: FC<StackArrayValueProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackArrayValue}`)
  const context = popout?.context ?? {}
  const value = context?.value ?? []
  const resultManager = context?.manager ?? documentManager
  const fields = omit(context?.fields ?? {}, '_type', '_id')
  const definitionLink = context?.definition
  const onChange = context?.onChange ?? noop
  const [definitionDefaultValue] = useLayerValue('defaultValue', definitionLink, { manager: resultManager })

  const handleAddItem = () => {
    const nextValue = [...value, definitionDefaultValue]
    onChange(nextValue)
    popoutsStore.updateCurrentContext({
      value: nextValue
    })
  }

  const handleRemoveItem = (index: number) => {
    nextTick(() => {
      onChange(value.toSpliced(index, 1))
    })
  }

  const handleUpdateValue = (index: number, nextValue: unknown) => {
    onChange(value.toSpliced(index, 1, nextValue))
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
        {/*<Sortable onSort={handleSort}>*/}
        {value.map((item, index) => (
          <div className={styles.item} key={index}>
            <InstancePropertyGeneric
              property={definitionLink}
              manager={resultManager}
              value={item}
              hasConnector
              isHideTitle
              onChange={nextValue => handleUpdateValue(index, nextValue)}
            />
            <Touchable className={styles.remove} onClick={() => handleRemoveItem(index)}>
              <RemoveIcon />
            </Touchable>
          </div>
        ))}
        {/*</Sortable>*/}

        <ControlRow isHideTitle>
          <Button mode='secondary' stretched onClick={handleAddItem}>
            Add item
          </Button>
        </ControlRow>
      </Panel>
    </div>
  )
}
