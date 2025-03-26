import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'

interface BuilderPreviewPropertiesProps {
  className?: string
}

export const BuilderPreviewProperties: FC<BuilderPreviewPropertiesProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const { properties } = useFragmentProperties()

  console.log(documentManager, properties)

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.title}>Properties</div>
      <div className={styles.list}>
        {properties.map(property => (
          <InstancePropertyGeneric key={property} property={property} instanceManager={documentManager} />
        ))}
        <div>dff</div>
        <div>dff</div>
        <div>dff</div>
        <div>dff</div>
        <div>dff</div>
      </div>
    </div>
  )
}
