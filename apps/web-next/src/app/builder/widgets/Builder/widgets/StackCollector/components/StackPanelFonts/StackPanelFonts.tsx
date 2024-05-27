import { FC } from 'react'
import * as Styled from './styles'
import { StackPanel } from '../../hooks/useStackCollector'
import { FONTS } from '../../../../data/fonts'
import { $getContextPopout } from '../../../../store/popoutStore'
import { useStore } from '@nanostores/react'

export interface StackPanelFontsOptions {
  value?: string
  onChange: (name: string) => void
}

interface StackPanelFontsProps extends StackPanel {
  className?: string
}

const StackPanelFonts: FC<StackPanelFontsProps> = ({ className }) => {
  const selfContext = useStore($getContextPopout('fonts'))

  console.log(selfContext)

  if (!selfContext?.value) return null
  const value = selfContext.value

  return (
    <Styled.Root className={className}>
      {FONTS.map(font => (
        <Styled.FontCell
          key={font.name}
          isActive={font.name === value}
          onClick={() => selfContext?.onChange(font.name)}
        >
          {font.name}
        </Styled.FontCell>
      ))}
    </Styled.Root>
  )
}

export default StackPanelFonts
