import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import BaseImage from '@/app/components/BaseImage/BaseImage'

interface ImageSelectorProps {
  value?: string | null
  isUploading?: boolean
  progress?: number
  className?: string
  onChange(file: File): void
}

const ImageSelector: FC<ImageSelectorProps> = ({ className, value, isUploading = false, progress = 0, onChange }) => {
  return (
    <label className={cn(styles.root)}>
      {isUploading && (
        <div className={styles.loaderBody}>
          <div className={styles.progressBar}>
            <div className={styles.progressBarInner} style={{ width: progress }} />
          </div>
        </div>
      )}
      <input
        className={styles.target}
        type='file'
        accept='.jpg,.png,.gif'
        onChange={({ target: { files } }) => onChange(files[0])}
      />

      {value ? (
        <BaseImage className={styles.image} src={value} />
      ) : (
        <div>
          <div className={styles.title}>Browse one file</div>
          <div className={styles.description}>jpg, .png or .gif</div>
        </div>
      )}
    </label>
  )
}

export default ImageSelector
