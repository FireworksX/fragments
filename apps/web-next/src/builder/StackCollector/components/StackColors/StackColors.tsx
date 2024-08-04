import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import Plus from '@/app/svg/plus.svg'
import ColorCell from '@/builder/components/ColorCell/ColorCell'
import { useBuilderAssetsColors } from '@/builder/Assets/hooks/useBuilderAssetsColors'
import { BuilderContext } from '@/builder/BuilderContext'
import { omit } from '@fragments/utils'

export type StackColorsValue = Color

interface StackColorsProps {
  className?: string
  getInitialColor?: () => Color
  activeColorKey?: string
  onSelect?: (colorKey: StackColorsValue) => void
  onCreate?: (colorKey: StackColorsValue) => void
}

const StackColors: FC<StackColorsProps> = ({ className, activeColorKey, getInitialColor, onSelect, onCreate }) => {
  const { documentManager } = useContext(BuilderContext)
  const [search, setSearch] = useState('')
  const { colorVariables, editColor, createColor } = useBuilderAssetsColors()

  const filteredColors = useMemo(
    () => colorVariables.filter(({ name }) => name?.search(search) !== -1),
    [colorVariables, search]
  )

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.searchWrapper}>
        <InputText placeholder='Search' value={search} onChange={setSearch} />
      </div>
      <div>
        <InputSelect
          className={styles.newCell}
          color='var(--border)'
          icon={<Plus className={styles.iconWrapper} width={15} height={15} />}
          placeholder='New color'
          onClick={() =>
            createColor({
              initialColor: omit(getInitialColor(), '_type'),
              onSubmit: onCreate
            })
          }
        />
        {filteredColors.map(variable => (
          <ColorCell
            className={cn(styles.cell, {
              [styles.active]: activeColorKey === documentManager.keyOfEntity(variable)
            })}
            key={variable?.name}
            sizeColor={15}
            color={variable?.color}
            onEdit={() => editColor(documentManager.keyOfEntity(variable))}
            onClick={() => onSelect && onSelect(documentManager.keyOfEntity(variable))}
          >
            {variable?.name}
          </ColorCell>
        ))}
      </div>
    </div>
  )
}

export default StackColors
