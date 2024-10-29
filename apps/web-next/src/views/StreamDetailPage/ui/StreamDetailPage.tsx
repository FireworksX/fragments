'use client'
import cn from 'classnames'
import styles from './styles.module.css'
import { Cell } from '@/shared/ui/Cell'
import { StatusDot } from '@/shared/ui/StatusDot/ui/StatusDot'
import { StreamFragmentDetail } from '@/widgets/streams/StreamFragmentDetail/ui/StreamFragmentDetail'
import { useStreamDetailPage } from '@/views/StreamDetailPage/hooks/useStreamDetailPage'
import { InputText } from '@/shared/ui/InputText'
import { Button } from '@/shared/ui/Button'
import PlusIcon from '@/shared/icons/next/plus.svg'
import CheckIcon from '@/shared/icons/next/check.svg'
import CloseIcon from '@/shared/icons/next/close.svg'

export const StreamDetailPage = () => {
  const {
    landings,
    createLandingRef,
    localName,
    setLocalName,
    isNewMode,
    setIsNewMode,
    loadingCreateLanding,
    handleCreateLanding
  } = useStreamDetailPage()

  return (
    <div className={cn(styles.root)}>
      <div className={styles.aside}>
        <div className={styles.asideHeader}>
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
        {landings.map(landing => (
          <Cell
            key={landing.id}
            className={styles.cell}
            before={<StatusDot status='success' />}
            description={landing.weight}
          >
            {landing.name}
          </Cell>
        ))}
      </div>

      <StreamFragmentDetail />
    </div>
  )
}
