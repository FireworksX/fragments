import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useCampaignsListAside } from '@/views/AreasListLayout/widgets/CampaignsListAside/hooks/useCampaignsListAside'
import { Panel } from '@/shared/ui/Panel'
import { Container } from '@/shared/ui/Container'
import { CampaignPreviewItem } from '../components/CampaignPreviewItem'
import { CampaignCreateItem } from '@/views/AreasListLayout/widgets/CampaignsListAside/components/CampaignCreateItem'
import { CampaignStatus } from '@/__generated__/types'
import { withSuspense } from '@/shared/hocs/withSuspense'
import { SpinnerBlock } from '@/shared/ui/SpinnerBlock'

interface AreasListAsideProps {
  className?: string
}

const Base: FC<AreasListAsideProps> = ({ className }) => {
  const { list, handleCreate } = useCampaignsListAside()

  return (
    <div className={cn(styles.root, className)}>
      <Container gutterSize={8}>
        <Panel>
          <div className={styles.content}>
            <CampaignCreateItem onCreate={handleCreate} />
            {list.map(item => (
              <CampaignPreviewItem
                key={item.id}
                className={styles.card}
                logo={item.defaultCampaign?.logo.url}
                name={item.defaultCampaign?.name}
                slug={item.id}
                statistic={item.statistic}
                isActive={item.defaultCampaign.status === CampaignStatus.Active}
              />
            ))}
          </div>
        </Panel>
      </Container>
    </div>
  )
}

export const AreasListAside = withSuspense(Base, <SpinnerBlock size={18} />)
