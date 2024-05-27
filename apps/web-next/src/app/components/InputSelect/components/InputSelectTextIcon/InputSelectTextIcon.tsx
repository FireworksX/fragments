import { FC } from 'react'
import * as Styled from './styles'
import Icon from '../../../Icon/Icon'
import { useTheme } from 'styled-components'

interface InputSelectTextIconProps {
  color?: string
  className?: string
}

const InputSelectTextIcon: FC<InputSelectTextIconProps> = ({ className, color }) => {
  const { colors } = useTheme()

  return (
    <Styled.Root className={className} style={{ backgroundColor: color ?? colors?.secondary }}>
      <Icon name='text-frame' width={11} height={11} />
    </Styled.Root>
  )
}

export default InputSelectTextIcon
