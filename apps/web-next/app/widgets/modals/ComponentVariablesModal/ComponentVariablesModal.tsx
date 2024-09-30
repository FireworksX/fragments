import { FC, useContext } from 'react'
import * as Styled from './styles'
import { ModalContext } from 'src/routes/BuilderRoute/ModalContext'
import BuilderPanelHeadAside from '../../../routes/BuilderRoute/components/BuilderPanelHeadAside/BuilderPanelHeadAside'
import Dropdown from '../../../components/Dropdown/Dropdown'
import DropdownGroup from '../../../components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '../../../components/Dropdown/components/DropdownOption/DropdownOption'
import { useComponentVariablesModal } from './hooks/useComponentVariablesModal'
import { useTheme } from 'styled-components'
import { noop } from '../../../utils/helpers'
import ComponentVariableNumber from './components/ComponentVariableNumber/ComponentVariableNumber'
import { StatexValue } from '@adstore/statex-react'
import { useStore } from '@nanostores/react'
import { $statex } from '../../../store/builderRouterStore'
import { builderComponentControlType } from '../../../data/promos/creators'
import ComponentVariableBoolean from './components/ComponentVariableBoolean/ComponentVariableBoolean'

interface ComponentVariablesModalProps {
  className?: string
}

const NAME = 'componentVariables'

const ComponentVariablesModal: FC<ComponentVariablesModalProps> = ({ className }) => {
  const statex = useStore($statex)
  const { close, name: modalName, context } = useContext(ModalContext)
  const { colors } = useTheme()
  const { definitions, active, activeProperty, select, onChange } = useComponentVariablesModal()

  const PropertyFields =
    activeProperty?.type &&
    {
      [builderComponentControlType.Number]: <ComponentVariableNumber {...activeProperty} onChange={onChange} />,
      [builderComponentControlType.Boolean]: <ComponentVariableBoolean {...activeProperty} onChange={onChange} />
    }[activeProperty?.type]

  return (
    <Styled.Root className={className} isOpen={modalName === NAME}>
      <Styled.Container>
        <Styled.Head>
          <Styled.Title>Variables</Styled.Title>
          <Dropdown
            options={
              <DropdownGroup>
                <DropdownOption> fdg</DropdownOption>
              </DropdownGroup>
            }
          >
            <BuilderPanelHeadAside />
          </Dropdown>
        </Styled.Head>

        <Styled.Body>
          <Styled.List>
            {definitions.map(field => (
              <StatexValue key={field} statex={statex} field={field}>
                {value => (
                  <Styled.Item
                    isActive={active === field}
                    propertyType={value.type}
                    color={colors.component}
                    onClick={() => select(field)}
                    onReset={noop}
                  >
                    {value.name}
                  </Styled.Item>
                )}
              </StatexValue>
            ))}
          </Styled.List>

          <Styled.Fields>{PropertyFields}</Styled.Fields>
        </Styled.Body>
      </Styled.Container>
    </Styled.Root>
  )
}

export default ComponentVariablesModal
