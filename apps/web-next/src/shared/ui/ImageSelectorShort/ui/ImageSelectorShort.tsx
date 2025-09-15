import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated } from '@react-spring/web'

interface ImageSelectorShortProps {
  isUploading?: boolean
  className?: string
  onChange(file: File): void
}

const ImageSelectorShort: FC<ImageSelectorShortProps> = ({ className, onChange }) => {
  return (
    <label className={cn(styles.root, className)}>
      <input
        className={styles.target}
        type='file'
        accept='.jpg,.png,.gif,.svg'
        onChange={({ target: { files } }) => onChange(files[0])}
      />
      Select File
    </label>
  )
}

export default animated(ImageSelectorShort)
