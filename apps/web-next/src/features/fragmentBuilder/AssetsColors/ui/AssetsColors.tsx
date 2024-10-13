import React, { FC, useContext } from 'react'
import { Collapse } from '@/shared/ui/Collapse'
import { ColorCell } from '@/shared/ui/ColorCell'
import { useBuilderAssetsColors } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsColors'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Container } from '@/shared/ui/Container'

export const AssetsColors: FC = () => {
  const { documentManager } = useContext(BuilderContext)
  const { editColor, colorVariables, removeColor } = useBuilderAssetsColors()

  if (!colorVariables?.length) return null

  return (
    <Container gutterSize='medium'>
      {colorVariables.length > 0 && (
        <Collapse title='Colors'>
          {colorVariables.map(color => (
            <ColorCell
              key={color?.name}
              color={color?.color}
              onClick={() => editColor(documentManager.keyOfEntity(color), { initial: true, position: 'left' })}
              onDelete={() => removeColor(documentManager.keyOfEntity(color))}
            >
              {color?.name}
            </ColorCell>
          ))}
        </Collapse>
      )}
    </Container>
  )
}
