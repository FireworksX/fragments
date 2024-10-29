import { StatusDot } from '@/shared/ui/StatusDot'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Button } from '@/shared/ui/Button'
import ChevronDown from '@/shared/icons/next/chevron-down.svg'
import styles from './styles.module.css'
import RunIcon from '@/shared/icons/next/play.svg'
import PauseIcon from '@/shared/icons/next/pause.svg'
import SettingsIcon from '@/shared/icons/next/settings.svg'
import EditIcon from '@/shared/icons/next/pencil.svg'
import TrashIcon from '@/shared/icons/next/trash.svg'

export const StreamFragmentDetail = () => {
  return (
    <div className={styles.fragment}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.title}>
            <StatusDot status='success' />
            BWin 100rub bonus <span className={styles.id}>#421</span>
          </div>
          <div className={styles.fragmentName}>Fragment: Bonus Card</div>
        </div>

        <div className={styles.actions}>
          <Dropdown
            trigger='click'
            options={
              <DropdownGroup>
                <DropdownOption mode='success' icon={<RunIcon />}>
                  Run
                </DropdownOption>
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

      <div className={styles.preview}>Preview</div>

      <div />
    </div>
  )
}
