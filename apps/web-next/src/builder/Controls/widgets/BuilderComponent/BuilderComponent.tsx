import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderComponent } from './hooks/useBuilderComponent'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Button from '@/app/components/Button'
import Select from '@/app/components/Select/Select'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin'

interface BuilderComponentProps {
  className?: string
}

const BuilderComponent: FC<BuilderComponentProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const { selectionGraph, label, variants, handleEdit } = useBuilderComponent()
  if (selectionGraph?._type !== builderNodes.ComponentInstance) {
    return null
  }

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
                <option key={variant._id} value={graphState.keyOfEntity(variant)}>
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
