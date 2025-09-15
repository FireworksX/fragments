import { FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ImageFileViewerProps {
  file: File
  alt?: string
  className?: string
}

export const ImageFileViewer: FC<ImageFileViewerProps> = ({ file, alt = 'Image', className = '' }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const fileRef = useRef(file)

  useEffect(() => {
    // Создаем URL для файла
    const createObjectURL = () => {
      try {
        if (file && file instanceof File) {
          const url = URL.createObjectURL(file)
          setImageUrl(url)
          setError(null)
        } else {
          setError('Incorrect file')
        }
      } catch (err) {
        setError('Error')
        console.error('Error creating object URL:', err)
      }
    }

    // Очищаем предыдущий URL если файл изменился
    if (fileRef.current !== file) {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
      fileRef.current = file
      createObjectURL()
    } else if (!imageUrl && file) {
      createObjectURL()
    }

    // Очистка при размонтировании
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [file, imageUrl])

  if (error) {
    return (
      <div className={`image-error ${className}`} style={style}>
        <p>Ошибка: {error}</p>
      </div>
    )
  }

  if (!file) {
    return (
      <div className={`image-placeholder ${className}`} style={style}>
        <p>Файл не выбран</p>
      </div>
    )
  }

  return <img src={imageUrl} alt={alt} className={cn(styles.root, className)} onError={() => setError('Error')} />
}
