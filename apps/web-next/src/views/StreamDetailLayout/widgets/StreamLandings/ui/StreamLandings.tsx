'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import CloseIcon from '@/shared/icons/next/close.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import { InputText } from '@/shared/ui/InputText'
import PlusIcon from '@/shared/icons/next/plus.svg'
import LogoIcon from '@/shared/icons/next/logo.svg'
import { Cell } from '@/shared/ui/Cell'
import { StatusDot } from '@/shared/ui/StatusDot'
import { useStreamLandings } from '../hooks/useStreamLandings'
import { Link } from '@/shared/ui/Link'
import { Placeholder } from '@/components/Placeholder'
import { noop } from '@fragments/utils'

interface StreamLandingsProps {
  className?: string
}

export const StreamLandings: FC<StreamLandingsProps> = ({ className }) => {
  const {
    landings,
    creatingRef,
    createInputRef,
    isCreating,
    localName,
    setLocalName,
    loadingCreateLanding,
    handleCreateLanding
  } = useStreamLandings()

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <Cell
          effect='none'
          ref={creatingRef}
          style={{ opacity: !landings.length ? (isCreating ? 1 : 0) : 1 }}
          className={styles.cell}
          before={<PlusIcon />}
          onClick={() => (isCreating ? noop : setLocalName(''))}
        >
          {isCreating ? (
            <form className={styles.row} onSubmit={handleCreateLanding}>
              <InputText
                ref={createInputRef}
                placeholder='Landing Name'
                value={localName}
                onChangeValue={setLocalName}
              />
              <Button disabled={localName?.length < 3} type='submit' loading={loadingCreateLanding} mode='success'>
                Done
              </Button>
            </form>
          ) : (
            'Create Landing'
          )}
        </Cell>
        {!landings.length && (
          <Placeholder
            stretched
            icon={<LogoIcon width={24} height={24} />}
            title='Empty list of landings'
            description='Create first landing for render fragment'
            actions={<Button onClick={() => setLocalName('')}>Create Landing</Button>}
          />
        )}
        {landings.map(landing => (
          <Link key={landing.id} type='landing' landingSlug={landing.id}>
            {({ isActive }) => (
              <Cell
                className={cn(styles.cell, { [styles.active]: isActive })}
                before={<StatusDot status={landing.active ? 'success' : 'error'} />}
                description={`${landing.weight ?? 0}%`}
              >
                {landing.name}
              </Cell>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
