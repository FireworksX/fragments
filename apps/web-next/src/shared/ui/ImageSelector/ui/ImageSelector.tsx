import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'
import { Button } from '@/shared/ui/Button'
import { BaseImage } from '@/shared/ui/BaseImage'

interface ImageSelectorProps {
  value?: string | null
  isUploading?: boolean
  progress?: number
  className?: string
  onChange(file: File): void
  onReset?(): void
}

const ImageSelector: FC<ImageSelectorProps> = ({
  className,
  value,
  isUploading = false,
  progress = 0,
  onChange,
  onReset
}) => {
  return (
    <label className={cn(styles.root)}>
      {value && onReset && (
        <div className={styles.resetBody}>
          <Button mode='secondary' onClick={onReset}>
            Reset
          </Button>
        </div>
      )}
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

export default animated(ImageSelector)
