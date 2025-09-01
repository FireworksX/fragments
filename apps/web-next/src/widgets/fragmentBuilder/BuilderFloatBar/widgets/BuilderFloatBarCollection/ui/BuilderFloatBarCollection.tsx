import React, { FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Touchable } from '@/shared/ui/Touchable'
import CollectionIcon from '@/shared/icons/next/database.svg'
import { Dropdown } from '@/shared/ui/Dropdown'
import { definition } from '@fragmentsx/definition'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Select } from '@/shared/ui/Select'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { Button } from '@/shared/ui/Button'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { useGraphStack } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { entityOfKey, keyOfEntity, LinkKey } from '@graph-state/core'
import { Instance } from '@/shared/ui/Popover/ui/Popover'

interface BuilderFloatBarCollectionProps {
  isActive?: boolean
  className?: string
  onSelectSource?: (sourceLink: LinkKey) => void
}

export const BuilderFloatBarCollection: FC<BuilderFloatBarCollectionProps> = ({
  className,
  isActive,
  onSelectSource
}) => {
  const { documentManager } = useBuilderDocument()
  const dropdownInstance = useRef<Instance | undefined>(undefined)
  const { createProperty, properties } = useFragmentProperties()
  const propertiesGraphs = useGraphStack(documentManager, properties)
  const sources = (propertiesGraphs ?? [])?.filter(graph => graph?.type === definition.variableType.Array)
  const [localSource, setLocalSource] = useState<LinkKey>()

  const activeSource = sources.find(source => source?._id === entityOfKey(localSource)?._id)

  const handleCreateSource = () => {
    const nextSourceLink = createProperty({
      type: definition.variableType.Array,
      name: `Collection ${sources?.length + 1}`
    })
    setLocalSource(nextSourceLink)
  }

  const handleSelectSource = () => {
    onSelectSource?.(localSource)
    dropdownInstance?.current?.hide()
  }

  useEffect(() => {
    if (!localSource && !!sources?.length) {
      setLocalSource(keyOfEntity(sources?.at(0)))
    }
  }, [sources, localSource])

  return (
    <Dropdown
      width={230}
      trigger='click'
      offset={[0, 20]}
      disabled={isActive}
      appendTo='body'
      onCreate={i => (dropdownInstance.current = i)}
      options={
        <Panel
          className={styles.content}
          title='Collection'
          aside={!!sources?.length && <PanelHeadAside onClick={handleCreateSource} />}
          withPaddingBottom
        >
          <div className={styles.body}>
            {!!sources?.length && (
              <ControlRow title='Source'>
                <ControlRowWide>
                  <Select value={localSource} onChange={setLocalSource}>
                    {sources.map(source => (
                      <option value={keyOfEntity(source)}>{source?.name ?? source?._id}</option>
                    ))}
                  </Select>
                </ControlRowWide>
              </ControlRow>
            )}

            {!sources?.length ? (
              <>
                <div className={styles.info}>You don't have any source of collection yet. Create your first one.</div>

                <Button stretched onClick={handleCreateSource}>
                  Create Source
                </Button>
              </>
            ) : (
              <Button stretched onClick={handleSelectSource}>
                Select "{activeSource?.name ?? activeSource?._id}"
              </Button>
            )}
          </div>
        </Panel>
      }
    >
      <Touchable
        className={className}
        TagName='button'
        onClick={() => (isActive ? onSelectSource(localSource) : undefined)}
      >
        <CollectionIcon width={20} height={20} />
      </Touchable>
    </Dropdown>
  )
}
