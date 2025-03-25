import cn from 'classnames'
import styles from './styles.module.css'
import { StreamLandings } from '@/views/StreamDetailLayout/widgets/StreamLandings'
import { StreamHeader } from '@/views/StreamDetailLayout/widgets/StreamHeader'

export const StreamDetailLayout = ({ children }) => {
  return (
    <div className={cn(styles.root)}>
      <StreamHeader className={styles.header} />
      <div className={styles.content}>
        <StreamLandings className={styles.aside} />
        {children}
      </div>
    </div>
  )
}
