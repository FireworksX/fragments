import { FC } from 'react'
import { Template } from '@adstore/templates'
import { Render } from '@adstore/templates-react'
import { useStatex } from '@adstore/statex-react'
import { useStore } from '@nanostores/react'
import * as Styled from './styles'
import { $layers, $statex } from '../../../../store/builderRouterStore'
import { useBuilderLayerRefs } from '../../../../widgets/Builder/hooks/useBuilderLayerRefs'
import BuilderFragmentWrapper from '../BuilderFragmentWrapper/BuilderFragmentWrapper'
import Icon from '../../../../components/Icon/Icon'
import { useComponentVariants } from '../../hooks/useComponentVariants'

interface BuilderDisplayComponentProps {
  className?: string
}

const DisplayComponent: FC<BuilderDisplayComponentProps> = ({ className }) => {
  const statex = useStore($statex)
  const { openLayerField } = useStore($layers)
  const componentValue = useStatex(statex, openLayerField)
  const componentVariants: string[] = componentValue?.children ?? []
  const { onClick } = useBuilderLayerRefs()
  const { addVariant } = useComponentVariants()

  return (
    <Styled.Root className={className}>
      {componentVariants.map(variantKey => (
        <BuilderFragmentWrapper key={variantKey} variantKey={variantKey}>
          <Render
            statex={statex}
            rootField={openLayerField}
            variantKey={variantKey}
            mode='development'
            onClick={onClick}
          >
            {Template}
          </Render>
        </BuilderFragmentWrapper>
      ))}
      <Styled.CreateVariant onClick={() => componentValue.addVariant()}>
        <Icon name='plus-circle' />
        Add variant
      </Styled.CreateVariant>
    </Styled.Root>
  )
}

export default DisplayComponent
