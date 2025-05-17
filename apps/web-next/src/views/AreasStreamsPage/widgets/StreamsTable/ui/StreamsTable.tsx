import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import NameIcon from '@/shared/icons/next/a-large-small.svg'
import HashIcon from '@/shared/icons/next/hash.svg'
import StatusIcon from '@/shared/icons/next/circle-fading-plus.svg'
import FilterIcon from '@/shared/icons/next/funnel.svg'
import ActionsIcon from '@/shared/icons/next/zap.svg'
import WeightIcon from '@/shared/icons/next/weight.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import PlayIcon from '@/shared/icons/next/play.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import LogoIcon from '@/shared/icons/next/logo.svg'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { times } from '@fragmentsx/utils'
import { StatusBadge } from '@/shared/ui/StatusBadge'
import { Button } from '@/shared/ui/Button'
import { Chip } from '@/shared/ui/Chip'
import { Link } from '@/shared/ui/Link'
import { InputText } from '@/shared/ui/InputText'
import { useStreamsTable } from '@/views/AreasStreamsPage/widgets/StreamsTable/hooks/useStreamsTable'
import { Placeholder } from '@/components/Placeholder'

interface StreamsTableProps {
  className?: string
  ref: unknown
  onCreate?: (name: string) => void
}

export const StreamsTable: FC<StreamsTableProps> = ({ className, ref, onCreate }) => {
  const {
    list,
    isCreating,
    updateStream,
    areaSlug,
    creatingName,
    creatingRowRef,
    setCreatingName,
    creatingInputRef,
    handleCreate,
    handleDeleteStream
  } = useStreamsTable(ref, onCreate)

  return (
    <div className={cn(styles.root, className)}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={cn(styles.cell, styles.idCell)}>
              <div className={styles.innerCell}>ID</div>
            </th>
            <th className={styles.cell}>
              <div className={styles.innerCell}>
                <NameIcon />
                Name
              </div>
            </th>
            <th className={styles.cell}>
              <div className={styles.innerCell}>
                <StatusIcon />
                Status
              </div>
            </th>
            <th className={styles.cell}>
              <div className={styles.innerCell}>
                <FilterIcon />
                Filters
              </div>
            </th>
            <th className={styles.cell}>
              <div className={styles.innerCell}>
                <ActionsIcon />
                Actions
              </div>
            </th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {isCreating && (
            <tr className={styles.row} ref={creatingRowRef}>
              <td className={styles.cell} colSpan={6}>
                <form className={styles.innerCell} onSubmit={handleCreate}>
                  <InputText
                    ref={creatingInputRef}
                    value={creatingName}
                    placeholder='Campaign Name'
                    onChangeValue={setCreatingName}
                  />
                  <Button disabled={creatingName?.length < 3} type='submit' icon={<CheckIcon />} mode='success'>
                    Create
                  </Button>
                </form>
              </td>
            </tr>
          )}

          {list.length === 0 && (
            <tr className={styles.row}>
              <td className={styles.cell} colSpan={6}>
                <Placeholder
                  icon={<LogoIcon width={24} height={24} />}
                  title='Empty list of streams'
                  description='Create new stream for control user flow'
                  actions={<Button onClick={() => ref?.current?.createNew?.()}>Create Campaign</Button>}
                />
              </td>
            </tr>
          )}

          {list.map(stream => (
            <tr key={stream.id} className={styles.row}>
              <td className={cn(styles.cell, styles.idCell)}>{stream.id}</td>
              <td className={styles.cell}>
                <Link type='stream' streamSlug={stream.id}>
                  {stream.name}
                </Link>
              </td>
              <td className={styles.cell}>
                <StatusBadge status={stream.active ? 'success' : 'warning'} />
              </td>
              <td className={styles.cell}>
                <div className={styles.innerCell}>
                  <Chip prefix='Location:'>Russia</Chip>
                  <Chip prefix='Device'>Mobile</Chip>
                  <Chip prefix='URL:'>/sportbooks/*</Chip>
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.innerCell}>
                  {stream.active ? (
                    <Button
                      size='small'
                      mode='warning-outline'
                      icon={<PauseIcon />}
                      onClick={() =>
                        updateStream({ campaignId: +areaSlug, streamId: stream.id, campaignId: 1, active: false })
                      }
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button
                      size='small'
                      mode='success-outline'
                      icon={<PlayIcon />}
                      onClick={() =>
                        updateStream({ campaignId: +areaSlug, streamId: stream.id, campaignId: 1, active: true })
                      }
                    >
                      Run
                    </Button>
                  )}

                  <Button
                    size='small'
                    mode='danger-outline'
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteStream({ variables: { streamId: stream.id } })}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
