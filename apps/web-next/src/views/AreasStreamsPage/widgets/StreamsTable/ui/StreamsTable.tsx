import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import NameIcon from '@/shared/icons/next/a-large-small.svg'
import HashIcon from '@/shared/icons/next/hash.svg'
import StatusIcon from '@/shared/icons/next/circle-fading-plus.svg'
import FilterIcon from '@/shared/icons/next/funnel.svg'
import ActionsIcon from '@/shared/icons/next/zap.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
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
import { Table } from '@/shared/ui/Table'
import { TableHeader } from '@/shared/ui/Table/components/TableHeader'
import { TableRow } from '@/shared/ui/Table/components/TableRow'
import { TableCell } from '@/shared/ui/Table/components/TableCell'
import { ConfigureCampaign } from '@/widgets/modals/ConfigureCampaign'
import SettingsIcon from '@/shared/icons/next/settings.svg'
import ExportIcon from '@/shared/icons/next/download.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { Avatar } from '@/shared/ui/Avatar'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { CampaignStatus } from '@/__generated__/types'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'
import { ReleaseCondition } from '@/widgets/ReleaseCondition'
import { SearchInput } from '@/shared/ui/SearchInput'
import { Spinner } from '@/shared/ui/Spinner'

interface StreamsTableProps {
  className?: string
}

const StreamsTable: FC<StreamsTableProps> = ({ className }) => {
  const { list, loading, updateStream, handleDeleteCampaignMutation, handleCreateCampaign } = useStreamsTable()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Campaigns</h2>
        <SearchInput className={styles.search} mode='tiny' placeholder='Search' />
        <Button mode='secondary' icon={<SettingsIcon />}>
          Customize
        </Button>
        <Button mode='secondary' icon={<ExportIcon />}>
          Export
        </Button>
        <Button icon={<PlusIcon />} loading={false} onClick={handleCreateCampaign}>
          Create Campaign
        </Button>
      </div>
      <div className={cn(styles.root, className)}>
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
                <FilterIcon />
                Filters
              </div>
              <div className={styles.innerCell}>
                <ActionsIcon />
                Actions
              </div>
            </TableHeader>
          }
        >
          {loading && (
            <TableRow className={styles.row}>
              <TableCell className={styles.cell} colSpan={6}>
                <Placeholder stretched actions={<Spinner size={16} color='var(--text-color-accent)' />} />
              </TableCell>
            </TableRow>
          )}

          {list.length === 0 && !loading && (
            <TableRow className={styles.row}>
              <TableCell className={styles.cell} colSpan={6}>
                <Placeholder
                  icon={<LogoIcon width={24} height={24} />}
                  title='Empty list of campaigns'
                  description='Create new campaign for control user flow'
                  actions={
                    <Button icon={<PlusIcon />} onClick={handleCreateCampaign}>
                      Create Campaign
                    </Button>
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
                  <div className={styles.nameCell}>
                    <CommonLogo size={24} src={stream.logo.publicPath} withRadius />
                    {stream.name}
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <StatusBadge status={stream.status === CampaignStatus.Active ? 'success' : 'warning'} />
              </TableCell>
              <TableCell>
                <div className={cn(styles.innerCell, styles.filtersCell)}>
                  {stream?.featureFlag?.releaseCondition && (
                    <ReleaseCondition releaseCondition={stream.featureFlag?.releaseCondition} />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className={styles.innerCell}>
                  <Link type='campaign' campaignSlug={stream.id}>
                    <Button size='small' mode='outline' icon={<EditIcon />}>
                      Edit
                    </Button>
                  </Link>

                  {stream.status === CampaignStatus.Active ? (
                    <Button
                      size='small'
                      mode='warning-outline'
                      icon={<PauseIcon />}
                      onClick={() => updateStream({ id: stream.id, status: CampaignStatus.Active })}
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button
                      size='small'
                      mode='success-outline'
                      icon={<PlayIcon />}
                      onClick={() => updateStream({ id: stream.id, active: CampaignStatus.Inactive })}
                    >
                      Run
                    </Button>
                  )}

                  <Button
                    size='small'
                    mode='danger-outline'
                    icon={<DeleteIcon />}
                    cancelable
                    onClick={() => handleDeleteCampaignMutation({ variables: { id: stream.id } })}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  )
}

export default withModalCollector(StreamsTable, {
  [modalNames.configureCampaign]: <ConfigureCampaign />
})
