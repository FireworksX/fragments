import { FC } from 'react'
import styles from './styles.module.css'
import { Container } from '@/shared/ui/Container'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { booleanTabsSelectorItems } from '@/shared/data'
import { FormField } from '@/shared/ui/FormField'
import { InputNumber } from '@/shared/ui/InputNumber'

interface StreamModalDetailProps {}

export const StreamModalDetail: FC<StreamModalDetailProps> = () => {
  return (
    <Container className={styles.root}>
      <div className={styles.title}>
        Melbet ru Gift MMA 15000 V2 - RU <span className={styles.id}>#432</span>
      </div>

      <div className={styles.row}>
        <FormField className={styles.field} label='Active'>
          <TabsSelector items={booleanTabsSelectorItems} value={true} />
        </FormField>
        <FormField className={styles.field} label='Weight'>
          <InputNumber value={0} />
        </FormField>
      </div>

      <FormField label='Props'></FormField>

      <FormField className={styles.preview} label='Preview'>
        <div className={styles.previewFrame} />
      </FormField>

      <div></div>
    </Container>
  )
}
