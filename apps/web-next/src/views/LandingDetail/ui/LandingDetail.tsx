'use client'
import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { LandingDetailHeader } from '@/views/LandingDetail/widgets/LandingDetailHeader'
import { useLandingDetail } from '@/views/LandingDetail/hooks/useLandingDetail'
import { Placeholder } from '@/components/Placeholder'
import Logo from '@/shared/icons/next/logo.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import ConnectIcon from '@/shared/icons/next/plug.svg'
import { Button } from '@/shared/ui/Button'
import { ProjectTreeModal } from '@/widgets/modals/ProjectTreeModal'

interface LandingDetailProps {
  className?: string
}

export const LandingDetail: FC<LandingDetailProps> = ({ className }) => {
  const { landing, handleClickConnect } = useLandingDetail()

  return (
    <div className={cn(styles.root, className)}>
      <LandingDetailHeader />

      <div className={styles.preview}>
        <Placeholder
          stretched
          icon={<Logo width={36} height={36} />}
          title='Connect fragment'
          description='Connect exists fragment or create new'
          actions={
            <>
              <Button icon={<ConnectIcon />} onClick={handleClickConnect}>
                Connect
              </Button>
              <Button mode='outline' icon={<PlusIcon />}>
                Create new
              </Button>
            </>
          }
        />
      </div>

      <ProjectTreeModal />
    </div>
  )
}
