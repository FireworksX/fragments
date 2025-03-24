import { FC } from 'react'
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

interface LandingDetailHeaderProps {
  className?: string
}

export const LandingDetailHeader: FC<LandingDetailHeaderProps> = ({ className }) => {
  const { landing, setActive } = useLandingDetailHeader()

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.headerInfo}>
        <div className={styles.title}>
          <StatusDot status={landing?.active ? 'success' : 'error'} />
          {landing?.name} <span className={styles.id}>#{landing?.id}</span>
        </div>
        {landing?.fragment && (
          <div className={styles.fragmentName}>
            Fragment:{' '}
            <Link type='builderFragment' fragmentId={landing.fragment?.id}>
              {landing.fragment?.name}
            </Link>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {landing?.active ? (
                <DropdownOption mode='warning' icon={<PauseIcon />} onClick={() => setActive(false)}>
                  Pause
                </DropdownOption>
              ) : (
                <DropdownOption
                  disabled={!landing?.fragment}
                  mode='success'
                  icon={<RunIcon />}
                  onClick={() => setActive(true)}
                >
                  Run
                </DropdownOption>
              )}

              <DropdownOption icon={<EditIcon />}>Edit</DropdownOption>
              <DropdownOption icon={<SettingsIcon />}>Configure Props</DropdownOption>
              <DropdownOption mode='danger' icon={<TrashIcon />}>
                Delete
              </DropdownOption>
            </DropdownGroup>
          }
        >
          <Button mode='secondary' icon={<ChevronDown />}>
            Actions
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
