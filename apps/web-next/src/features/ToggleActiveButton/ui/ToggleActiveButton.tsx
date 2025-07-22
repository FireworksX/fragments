import { FC } from 'react'
import { Button } from '@/shared/ui/Button'
import PauseIcon from '@/shared/icons/next/pause.svg'
import RunIcon from '@/shared/icons/next/play.svg'

interface ToggleActiveButtonProps {
  isActive?: boolean
  loading?: boolean
  onClick(): void
}

export const ToggleActiveButton: FC<ToggleActiveButtonProps> = ({ isActive, loading, onClick }) => {
  return isActive ? (
    <Button mode='warning-outline' preventDefault loading={loading} cancelable icon={<PauseIcon />} onClick={onClick}>
      Pause
    </Button>
  ) : (
    <Button mode='success-outline' preventDefault loading={loading} cancelable icon={<RunIcon />} onClick={onClick}>
      Run
    </Button>
  )
}
