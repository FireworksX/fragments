import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StatusDot } from '@/shared/ui/StatusDot'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import RunIcon from '@/shared/icons/next/play.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
import SettingsIcon from '@/shared/icons/next/settings.svg'
import TrashIcon from '@/shared/icons/next/trash.svg'
import { Button } from '@/shared/ui/Button'
import ChevronDown from '@/shared/icons/next/chevron-down.svg'
import { useLandingDetailHeader } from '@/views/LandingDetail/widgets/LandingDetailHeader/hooks/useLandingDetailHeader'
import { Link } from '@/shared/ui/Link'
import { ContentEditable } from '@/shared/ui/ContentEditable'
import { Slider } from '@/shared/ui/Slider'

interface LandingDetailHeaderProps {
  className?: string
}

export const LandingDetailHeader: FC<LandingDetailHeaderProps> = ({ className }) => {
  const { landing, updateLanding } = useLandingDetailHeader()
  const [localWeight, setLocalWeight] = useState(0)

  useEffect(() => {
    setLocalWeight(landing?.weight ?? 0)
  }, [landing?.weight])

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.headerInfo}>
        <div className={styles.title}>
          <StatusDot status={landing?.active ? 'success' : 'error'} />
          <ContentEditable className={styles.name} value={landing?.name} onSubmit={name => updateLanding({ name })} />
          <span className={styles.id}>#{landing?.id}</span>
        </div>
        <div className={styles.infoRow}>
          {landing?.fragment && (
            <div className={styles.infoCell}>
              Fragment:{' '}
              <Link type='builderFragment' fragmentId={landing.fragment?.id}>
                {landing.fragment?.name}
              </Link>
            </div>
          )}

          <div className={styles.delimiter}></div>

          <div className={styles.infoCell}>
            Weight:{' '}
            <Dropdown
              trigger='click'
              onHide={() => updateLanding({ weight: localWeight })}
              options={
                <DropdownGroup>
                  <Slider value={localWeight} max={100} min={0} onChange={setLocalWeight} />
                </DropdownGroup>
              }
            >
              <span className={styles.weightControl}>{localWeight}%</span>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        {landing?.active ? (
          <Button
            size='small'
            icon={<PauseIcon />}
            mode='warning-outline'
            onClick={() => updateLanding({ active: false })}
          >
            Pause
          </Button>
        ) : (
          <Button
            size='small'
            icon={<RunIcon />}
            mode='success-outline'
            onClick={() => updateLanding({ active: true })}
          >
            Run
          </Button>
        )}
        <Button icon={<TrashIcon />} size='small' mode='danger-outline'>
          Delete
        </Button>
      </div>
    </div>
  )
}
