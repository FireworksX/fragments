'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Button } from '@/shared/ui/Button'
import CloseIcon from '@/shared/icons/next/close.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import { InputText } from '@/shared/ui/InputText'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { Cell } from '@/shared/ui/Cell'
import { StatusDot } from '@/shared/ui/StatusDot'
import { useStreamLandings } from '../hooks/useStreamLandings'
import { Link } from '@/shared/ui/Link'

interface StreamLandingsProps {
  className?: string
}

export const StreamLandings: FC<StreamLandingsProps> = ({ className }) => {
  const {
    landings,
    createLandingRef,
    localName,
    setLocalName,
    isNewMode,
    setIsNewMode,
    loadingCreateLanding,
    handleCreateLanding
  } = useStreamLandings()

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.header}>
        {isNewMode ? (
          <>
            <Button stretched mode='secondary' icon={<CloseIcon />} onClick={() => setIsNewMode(false)}>
              Cancel
            </Button>
            <Button
              stretched
              disabled={localName.length === 0}
              mode='success'
              icon={<CheckIcon />}
              loading={loadingCreateLanding}
              onClick={handleCreateLanding}
            >
              Create
            </Button>
          </>
        ) : (
          <>
            <InputText placeholder='Search' />
            <Button icon={<PlusIcon />} onClick={() => setIsNewMode(true)}>
              New
            </Button>
          </>
        )}
      </div>
      {isNewMode && (
        <InputText ref={createLandingRef} placeholder='Landing name' value={localName} onChangeValue={setLocalName} />
      )}
      <div className={styles.body}>
        {landings.map(landing => (
          <Link key={landing.id} type='landing' landingSlug={landing.id}>
            {({ isActive }) => (
              <Cell
                className={cn(styles.cell, { [styles.active]: isActive })}
                before={<StatusDot status={landing.active ? 'success' : 'error'} />}
                description={landing.weight}
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
