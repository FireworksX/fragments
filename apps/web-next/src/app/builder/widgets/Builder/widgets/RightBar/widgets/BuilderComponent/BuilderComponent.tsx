import { FC } from 'react'
import { useStore } from '@nanostores/react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderComponent } from './hooks/useBuilderComponent'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { $statex } from '../../../../../../store/builderRouterStore'
import { keyOfEntity } from '@adstore/statex'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Button from '@/app/components/Button'
import Select from '@/app/components/Select/Select'

interface BuilderComponentProps {
  className?: string
}

const BuilderComponent: FC<BuilderComponentProps> = ({ className }) => {
  const statex = useStore($statex)
  const { label, variants, handleEdit } = useBuilderComponent()

  return (
    <Panel
      className={cn(styles.root, className)}
      title={label}
      aside={<div className={styles.description}>Component</div>}
    >
      {variants.list.length > 1 && (
        <ControlRow title='Variant'>
          <ControlRowWide>
            <Select value={variants.value} onChange={variants.onChange}>
              {variants.list.map(variant => (
                <option key={variant._id} value={keyOfEntity(variant)}>
                  {variant.name}
                </option>
              ))}
            </Select>
          </ControlRowWide>
        </ControlRow>
      )}

      <Button className={styles.editButton} mode='secondary' stretched onClick={handleEdit}>
        Edit Component
      </Button>
    </Panel>
  )
}

export default BuilderComponent
