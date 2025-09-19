import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Plus from '@/shared/icons/plus.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { omit } from '@fragmentsx/utils'
import { InputText } from '@/shared/ui/InputText'
import { InputSelect } from '@/shared/ui/InputSelect'
import { ColorCell } from '@/shared/ui/ColorCell'
import { useBuilderAssetsColors } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsColors'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useProject } from '@/shared/hooks/useProject'
import { definition } from '@fragmentsx/definition'
import { Button } from '@/shared/ui/Button'
import { keyOfEntity } from '@graph-state/core'

export type StackColorsValue = Color

interface StackColorsProps {
  className?: string
  activeColorKey?: string
  onSelect?: (colorKey: StackColorsValue) => void
  onCreate?: () => void
}

const SolidPaintStyles: FC<StackColorsProps> = ({ className, activeColorKey, onSelect, onCreate }) => {
  const [search, setSearch] = useState('')
  const { colorProperties, editColor, createColor } = useBuilderAssetsColors()

  const filteredColors = useMemo(
    () => colorProperties.filter(({ name }) => name?.search(search) !== -1),
    [colorProperties, search]
  )

  const handleCreateColor = () => {
    createColor({
      initialColor: '',
      onSubmit: onCreate
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      <InputText placeholder='Search' value={search} onChange={setSearch} />
      <div>
        {filteredColors.map(variable => (
          <ColorCell
            className={cn(styles.cell, {
              [styles.active]: activeColorKey === keyOfEntity(variable)
            })}
            key={variable?.name}
            sizeColor={15}
            color={variable?.defaultValue}
            onEdit={() => editColor(variable._id)}
            onClick={() => onSelect && onSelect(keyOfEntity(variable))}
          >
            {variable?.name}
          </ColorCell>
        ))}
      </div>

      <Button mode='secondary' stretched onClick={handleCreateColor}>
        New Color
      </Button>
    </div>
  )
}

export default SolidPaintStyles
