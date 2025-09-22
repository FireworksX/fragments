import { FC } from 'react'
import styles from './styles.module.css'
import { InfoSectionHeader } from '@/components/InfoSection/components/InfoSectionHeader'
import { InfoSectionFooter } from '@/components/InfoSection/components/InfoSectionFooter'
import { InfoSectionCell } from '@/components/InfoSection/components/InfoSectionCell'
import { Placeholder } from '@/components/Placeholder'
import VariableIcon from '@/shared/icons/next/variable.svg'
import { Button } from '@/shared/ui/Button'
import { PropertyIcon } from '@/shared/ui/PropertyIcon'
import { InfoSection } from '@/components/InfoSection'
import { ScopeVariablesCreateButton } from '@/widgets/ScopeVariables/components/ScopeVariablesCreateButton'
import { definition } from '@fragmentsx/definition'
import { useScopeVariables, UseScopeVariablesOptions } from '@/widgets/ScopeVariables/hooks/useScopeVariables'
import { withModalCollector } from '@/shared/hocs/withModalCollector'
import { modalNames } from '@/shared/data'
import { PropertyString } from '@/widgets/modals/PropertyString'
import { PropertyColor } from '@/widgets/modals/PropertyColor'
import { ColorPicker } from '@/widgets/modals/ColorPicker'

const SCOPE_VARIABLE_TYPES = [definition.variableType.String, definition.variableType.Color]

interface ScopeVariablesProps {
  className?: string
  loading?: boolean
  properties?: UseScopeVariablesOptions['properties']
  onChange?: UseScopeVariablesOptions['onChange']
}

const ScopeVariablesInternal: FC<ScopeVariablesProps> = ({ className, loading, properties = [], onChange }) => {
  const { handleEditProperty, handleAddProperty, handleRemoveProperty } = useScopeVariables({ properties, onChange })

  return (
    <InfoSection
      className={className}
      loading={loading}
      header={
        <InfoSectionHeader
          title='Variables'
          description='Define area scope variable for use within campaings and fragments'
          aside={
            !!properties.length && (
              <ScopeVariablesCreateButton definitions={SCOPE_VARIABLE_TYPES} onClick={handleAddProperty} />
            )
          }
        />
      }
      footer={<InfoSectionFooter>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</InfoSectionFooter>}
    >
      {!properties.length && (
        <InfoSectionCell>
          <Placeholder
            title='Variable'
            icon={<VariableIcon width={32} height={32} />}
            description='Create first variable for use it within fragments'
            actions={<ScopeVariablesCreateButton definitions={SCOPE_VARIABLE_TYPES} onClick={handleAddProperty} />}
          />
        </InfoSectionCell>
      )}

      {properties.map(variable => (
        <InfoSectionCell
          key={variable?._id}
          title={variable?.name}
          description={`ID: ${variable?._id}`}
          after={
            <>
              <Button mode='outline' onClick={() => handleEditProperty?.(variable._id)}>
                Edit
              </Button>
              <Button mode='danger-outline' onClick={() => handleRemoveProperty?.(variable._id)}>
                Remove
              </Button>
            </>
          }
          before={
            variable?.type === definition.variableType.Color ? (
              <div className={styles.colorIcon} style={{ background: variable?.defaultValue }} />
            ) : (
              <PropertyIcon type={variable?.type} className={styles.propertyIcon} />
            )
          }
        ></InfoSectionCell>
      ))}
    </InfoSection>
  )
}

export const ScopeVariables = withModalCollector(ScopeVariablesInternal, {
  [modalNames.propertyString]: <PropertyString />,
  [modalNames.propertyColor]: <PropertyColor />,
  [modalNames.colorPicker]: <ColorPicker />
})
