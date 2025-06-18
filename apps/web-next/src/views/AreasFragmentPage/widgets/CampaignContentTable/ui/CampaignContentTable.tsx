import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Table } from '@/shared/ui/Table'
import { TableHeader } from '@/shared/ui/Table/components/TableHeader'
import NameIcon from '@/shared/icons/next/a-large-small.svg'
import HashIcon from '@/shared/icons/next/hash.svg'
import StatusIcon from '@/shared/icons/next/circle-fading-plus.svg'
import FilterIcon from '@/shared/icons/next/funnel.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import ActionsIcon from '@/shared/icons/next/zap.svg'
import WeightIcon from '@/shared/icons/next/weight.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import PlayIcon from '@/shared/icons/next/play.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import LogoIcon from '@/shared/icons/next/logo.svg'
import { TableRow } from '@/shared/ui/Table/components/TableRow'
import { TableCell } from '@/shared/ui/Table/components/TableCell'
import { Link } from '@/shared/ui/Link'
import { Chip } from '@/shared/ui/Chip'
import { StatusBadge } from '@/shared/ui/StatusBadge'
import { Button } from '@/shared/ui/Button'
import { Placeholder } from '@/components/Placeholder'
import Logo from '@/shared/icons/next/logo.svg'
import ConnectIcon from '@/shared/icons/next/plug.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'

interface CampaignContentTableProps {
  className?: string
}

export const CampaignContentTable: FC<CampaignContentTableProps> = ({ className }) => {
  const list = [
    {
      id: 10,
      name: 'test',
      active: false
    }
  ]

  return (
    <Table
      className={styles.table}
      bodyClassName={styles.tbody}
      header={
        <TableHeader className={styles.thead}>
          <div className={styles.innerCell}>ID</div>
          <div className={styles.innerCell}>
            <NameIcon />
            Name
          </div>
          <div className={styles.innerCell}>
            <StatusIcon />
            Status
          </div>
          <div className={styles.innerCell}>
            <WeightIcon />
            Rollout
          </div>
          <div className={styles.innerCell}>
            <FragmentIcon />
            Fragment
          </div>
          <div className={styles.innerCell}>
            <ActionsIcon />
            Actions
          </div>
        </TableHeader>
      }
    >
      {/*{isCreating && (*/}
      {/*  <TableRow className={styles.row} ref={creatingRowRef}>*/}
      {/*    <TableCell className={styles.cell} colSpan={6}>*/}
      {/*      <form className={styles.innerCell} onSubmit={handleCreate}>*/}
      {/*        <InputText*/}
      {/*          ref={creatingInputRef}*/}
      {/*          value={creatingName}*/}
      {/*          placeholder='Campaign Name'*/}
      {/*          onChangeValue={setCreatingName}*/}
      {/*        />*/}
      {/*        <Button disabled={creatingName?.length < 3} type='submit' icon={<CheckIcon />} mode='success'>*/}
      {/*          Create*/}
      {/*        </Button>*/}
      {/*      </form>*/}
      {/*    </TableCell>*/}
      {/*  </TableRow>*/}
      {/*)}*/}

      {list.length === 0 && (
        <TableRow className={styles.row}>
          <TableCell className={styles.cell} colSpan={6}>
            <Placeholder
              stretched
              icon={<Logo width={36} height={36} />}
              title='Connect fragment'
              description='Connect exists fragment or create new'
              actions={
                <>
                  <Button icon={<ConnectIcon />}>Connect</Button>
                  <Button mode='outline' icon={<PlusIcon />}>
                    Create new
                  </Button>
                </>
              }
            />
          </TableCell>
        </TableRow>
      )}

      {list.map(stream => (
        <TableRow key={stream.id}>
          <TableCell className={styles.idCell}>{stream.id}</TableCell>
          <TableCell>
            <Link type='campaign' campaignSlug={stream.id}>
              {stream.name}
            </Link>
          </TableCell>
          <TableCell>
            <StatusBadge status={stream.active ? 'success' : 'warning'} />
          </TableCell>
          <TableCell>40%</TableCell>
          <TableCell className={styles.innerCell}>
            <div className={styles.preview}></div>
            <Button mode='tertiary'>TG banner</Button>
          </TableCell>
          <TableCell>
            <div className={styles.innerCell}>
              {stream.active ? (
                <Button size='small' mode='warning-outline' icon={<PauseIcon />}>
                  Pause
                </Button>
              ) : (
                <Button size='small' mode='success-outline' icon={<PlayIcon />}>
                  Run
                </Button>
              )}

              <Button size='small' mode='danger-outline' icon={<DeleteIcon />}>
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
