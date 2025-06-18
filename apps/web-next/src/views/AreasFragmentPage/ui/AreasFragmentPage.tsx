'use client'
import { FC } from 'react'
import styles from './styles.module.css'
import Logo from '@/shared/icons/next/logo.svg'
import { Button } from '@/shared/ui/Button'
import ConnectIcon from '@/shared/icons/next/plug.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { Placeholder } from '@/components/Placeholder'
import { useAreasFragmentPage } from '../hooks/useAreasFragmentPage'
import { ProjectTreeModal } from '@/widgets/modals/ProjectTreeModal'
import { FragmentPreviewSandbox } from '@/widgets/FragmentPreviewSandbox'
import { Link } from '@/shared/ui/Link'
import { CampaignContentTable } from '@/views/AreasFragmentPage/widgets/CampaignContentTable'

interface CampaignDetailPageProps {}

export const AreasFragmentPage: FC<CampaignDetailPageProps> = () => {
  const { fragmentId, handleClickConnect } = useAreasFragmentPage()

  return (
    <div className={styles.root}>
      <ProjectTreeModal />
      <CampaignContentTable />
      {fragmentId ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>Fragment: tgBanner</div>
            <div className={styles.titleGroup}>
              <Link type='builderFragment' fragmentId={fragmentId}>
                <Button mode='outline' size='medium'>
                  Edit
                </Button>
              </Link>

              <Button mode='outline' size='medium'>
                Replace
              </Button>
              <Button mode='danger-outline' size='medium'>
                Delete
              </Button>
            </div>
          </div>
          <div className={styles.preview}>
            <FragmentPreviewSandbox fragmentId={fragmentId} />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  )
}
