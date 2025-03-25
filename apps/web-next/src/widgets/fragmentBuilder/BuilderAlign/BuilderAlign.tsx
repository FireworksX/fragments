import { FC } from 'react'
import * as Styled from './styles'
import Icon from '../../../../../../components/Icon/Icon'
import { useBuilderAlign } from './hooks/useBuilderAlign'

interface BuilderAlignProps {
  className?: string
}

const BuilderAlign: FC<BuilderAlignProps> = ({ className }) => {
  const { disabledMap } = useBuilderAlign()

  return (
    <Styled.Root className={className}>
      <Styled.AlignButton disabled={disabledMap.left}>
        <Icon name='align-left' width={14} height={14} />
      </Styled.AlignButton>
      <Styled.AlignButton disabled={disabledMap.horizontal}>
        <Icon name='align-horizontal' width={14} height={14} />
      </Styled.AlignButton>
      <Styled.AlignButton disabled={disabledMap.right}>
        <Icon name='align-right' width={14} height={14} />
      </Styled.AlignButton>
      <Styled.AlignButton disabled={disabledMap.top}>
        <Icon name='align-top' width={14} height={14} />
      </Styled.AlignButton>
      <Styled.AlignButton disabled={disabledMap.vertical}>
        <Icon name='align-vertical' width={14} height={14} />
      </Styled.AlignButton>
      <Styled.AlignButton disabled={disabledMap.bottom}>
        <Icon name='align-bottom' width={14} height={14} />
      </Styled.AlignButton>
    </Styled.Root>
  )
}

export default BuilderAlign
