import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Table } from '@/shared/ui/Table'
import { TableHeader } from '@/shared/ui/Table/components/TableHeader'
import NameIcon from '@/shared/icons/next/a-large-small.svg'
import StatusIcon from '@/shared/icons/next/circle-fading-plus.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import ActionsIcon from '@/shared/icons/next/zap.svg'
import WeightIcon from '@/shared/icons/next/weight.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
import DeleteIcon from '@/shared/icons/next/trash.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import PlayIcon from '@/shared/icons/next/play.svg'
import Logo from '@/shared/icons/next/logo.svg'
import { TableRow } from '@/shared/ui/Table/components/TableRow'
import { TableCell } from '@/shared/ui/Table/components/TableCell'
import { StatusBadge } from '@/shared/ui/StatusBadge'
import { Button } from '@/shared/ui/Button'
import { Placeholder } from '@/components/Placeholder'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { useCampaignContentTable } from '@/views/AreasFragmentPage/widgets/CampaignContentTable/hooks/useCampaignContentTable'
import { SearchInput } from '@/shared/ui/SearchInput'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { ConfigureFeatureFlagVariant } from '@/widgets/modals/ConfigureFeatureFlagVariant'
import { ConfigureFragmentVariant } from '@/widgets/modals/ConfigureFragmentVariant'
import { statusToIndicatorMap } from '@/shared/data/constants'
import { CampaignStatus, RotationType, VariantStatus } from '@/__generated__/types'
import { Spinner } from '@/shared/ui/Spinner'
import { InputSelect } from '@/shared/ui/InputSelect'
import { capitalize } from '@/shared/utils/capitalize'
import { ProjectTreeModal } from '@/widgets/modals/ProjectTreeModal'
import { ModalCollector } from '@/widgets/ModalCollector'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'

interface CampaignContentTableProps {
  campaignId: number
  className?: string
  onAddFragment?: () => void
}

const CampaignContentTable: FC<CampaignContentTableProps> = ({ className, campaignId, onAddFragment }) => {
  const {
    variants,
    loadingVariants,
    featureFlag,
    variantsRollout,
    loadingVariantsRollout,
    creatingVariant,
    removeVariant,
    handleAddVariant,
    toggleVariantStatus,
    handleSetRotationType,
    handleEditFragment,
    handleEditVariant
  } = useCampaignContentTable(campaignId)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {variants.length > 1 && (
          <>
            <SearchInput mode='tiny' placeholder='Search...' />
            <Dropdown
              width={230}
              placement='bottom-end'
              trigger='click'
              hideOnClick
              options={
                <DropdownGroup>
                  <DropdownOption
                    gap={2}
                    direction='column'
                    description='The user is shown the same option every time.'
                    onClick={() => handleSetRotationType(RotationType.Keep)}
                  >
                    Keep
                  </DropdownOption>
                  <DropdownOption
                    gap={2}
                    direction='column'
                    description='The user is shown a random option each time.'
                    onClick={() => handleSetRotationType(RotationType.Rotate)}
                  >
                    Rotate
                  </DropdownOption>
                </DropdownGroup>
              }
            >
              <SelectMimicry>
                <span className={styles.rotationSpan}>Rotation mode:</span>{' '}
                {capitalize(featureFlag?.rotationType?.toLowerCase())}
              </SelectMimicry>
            </Dropdown>
          </>
        )}

        {/*<Button mode='outline' icon={<PlusIcon />}>*/}
        {/*  Create new*/}
        {/*</Button>*/}
        <Button icon={<PlusIcon />} loading={creatingVariant} onClick={handleAddVariant}>
          Add variant
        </Button>
      </div>

      <Table
        className={cn(styles.table, className)}
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
              <Spinner
                style={{
                  transition: 'var(--animation-transition-default)',
                  opacity: loadingVariantsRollout ? 1 : 0
                }}
                size={12}
                color='var(--secondary)'
              />
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

        {loadingVariants && (
          <TableRow className={styles.row}>
            <TableCell className={styles.cell} colSpan={6}>
              <Placeholder stretched actions={<Spinner size={16} color='var(--text-color-accent)' />} />
            </TableCell>
          </TableRow>
        )}

        {variants.length === 0 && !loadingVariants && (
          <TableRow className={styles.row}>
            <TableCell className={styles.cell} colSpan={6}>
              <Placeholder
                stretched
                icon={<Logo width={36} height={36} />}
                title='Add variant'
                description='You can add few varaints and configure rotation itself'
                actions={
                  <>
                    <Button icon={<PlusIcon />} onClick={handleAddVariant}>
                      Add variant
                    </Button>
                    {/*<Button mode='outline' icon={<PlusIcon />}>*/}
                    {/*  Create new*/}
                    {/*</Button>*/}
                  </>
                }
              />
            </TableCell>
          </TableRow>
        )}

        {variants.map((variant, index) => (
          <TableRow key={variant.id}>
            <TableCell className={styles.idCell}>{variant.id}</TableCell>
            <TableCell>{variant.name}</TableCell>
            <TableCell>
              <StatusBadge status={statusToIndicatorMap[variant.status]} />
            </TableCell>
            <TableCell className={cn(styles.rollout, { [styles.rolloutLoading]: loadingVariantsRollout })}>
              {loadingVariantsRollout ? 100 : variantsRollout.at(index)?.rolloutPercentage}%
            </TableCell>
            <TableCell className={styles.innerCell}>
              <InputSelect
                icon={<FragmentIcon color='var(--text-color)' />}
                color='var(--component)'
                placeholder='Set...'
                onClick={() => handleEditFragment(variant.id)}
              >
                {variant?.fragment?.fragment?.name}
              </InputSelect>
              {/*<div className={styles.preview}></div>*/}
              {/*<Button mode='tertiary'>{variant?.fragment?.fragment?.name}</Button>*/}
            </TableCell>
            <TableCell>
              <div className={styles.innerCell}>
                <Button
                  size='small'
                  mode={variant.status === VariantStatus.Active ? 'warning-outline' : 'success-outline'}
                  icon={variant.status === VariantStatus.Active ? <PauseIcon /> : <PlayIcon />}
                  onClick={() => toggleVariantStatus(variant.id)}
                >
                  {variant.status === VariantStatus.Active ? 'Pause' : 'Run'}
                </Button>
                <Button size='small' mode='outline' icon={<EditIcon />} onClick={() => handleEditVariant(variant.id)}>
                  Edit
                </Button>

                <Button
                  size='small'
                  mode='danger-outline'
                  icon={<DeleteIcon />}
                  cancelable
                  onClick={() => removeVariant({ variables: { id: variant.id } })}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  )
}

export default withModalCollector(CampaignContentTable, {
  [modalNames.configureFeatureFlagVariant]: <ConfigureFeatureFlagVariant />,
  [modalNames.configureFragmentVariant]: <ConfigureFragmentVariant />,
  [modalNames.projectTree]: <ProjectTreeModal />
})
