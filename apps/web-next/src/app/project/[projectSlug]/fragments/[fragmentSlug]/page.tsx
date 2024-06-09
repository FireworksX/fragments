import styles from './styles.module.css'
import { PageHeading } from '@/app/components/PageHeading/PageHeading'

export default function () {
  return (
    <div className={styles.root}>
      <PageHeading>Fragment name</PageHeading>
      <h2>fragmnet</h2>
    </div>
  )
}
