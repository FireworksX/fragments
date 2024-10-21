import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'
import EditIcon from '@/shared/icons/settings.svg'

interface CampaignDetailPageProps {}

export const CampaignDetailLayout: FC<CampaignDetailPageProps> = ({ children }) => {
  return (
    <Container className={styles.root}>
      <div className={styles.header}>
        <div className={styles.logo}></div>
        <div>
          <div className={styles.name}>
            Improve Gifts
            <span className={styles.liveBadge}>live</span>
          </div>
          <div className={styles.meta}>
            <span>Start: 12.10.2025</span>
            <span>End: 25.10.2025</span>
          </div>
        </div>

        <div className={styles.headerAside}>
          <Button icon={<EditIcon />} mode='secondary'>
            Edit Campaign
          </Button>
        </div>
      </div>

      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deserunt doloremque sunt voluptatum.
        Asperiores cum, debitis dolor eaque eos ex facere in inventore maiores minima modi, odit, perspiciatis tenetur.
      </div>

      {children}
    </Container>
  )
}
