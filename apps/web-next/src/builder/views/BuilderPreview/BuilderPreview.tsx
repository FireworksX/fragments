import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderPreviewContainer } from '@/builder/views/BuilderPreview/widgets/BuilderPreviewContainer/BuilderPreviewContainer'
import { Fragment } from '@/builder/renderer/Fragment/Fragment'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderPreviewProps {
  className?: string
}

export const BuilderPreview: FC<BuilderPreviewProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)

  return (
    <div className={cn(styles.root, className)} data-testid='BuilderPreview'>
      <BuilderPreviewContainer>
        <Fragment documentManager={documentManager} />
      </BuilderPreviewContainer>
    </div>
  )
}
