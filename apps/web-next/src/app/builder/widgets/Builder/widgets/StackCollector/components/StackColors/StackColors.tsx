import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import ColorCell from '@/app/builder/widgets/Builder/components/ColorCell/ColorCell'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import { useBuilderAssetsColors } from '@/app/builder/widgets/Builder/widgets/Assets/hooks/useBuilderAssetsColors'
import Plus from '@/app/svg/plus.svg'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export type StackColorsValue = Color

interface StackColorsProps {
  className?: string
  initialColor?: Color
  activeColorKey?: string
  onSelect?: (colorKey: StackColorsValue) => void
  onCreate?: (colorKey: StackColorsValue) => void
}

const StackColors: FC<StackColorsProps> = ({ className, activeColorKey, initialColor, onSelect, onCreate }) => {
  const { graphState } = useContext(BuilderContext)
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
              initialColor,
              onSubmit: onCreate
            })
          }
        />
        {filteredColors.map(variable => (
          <ColorCell
            className={cn(styles.cell, {
              [styles.active]: activeColorKey === graphState.keyOfEntity(variable)
            })}
            key={variable?.name}
            sizeColor={15}
            color={variable?.color}
            description={
              <Button
                className={styles.cellButton}
                mode='secondary'
                onClick={() => editColor(graphState.keyOfEntity(variable))}
              >
                Edit
              </Button>
            }
            onClick={() => onSelect && onSelect(graphState.keyOfEntity(variable))}
          >
            {variable?.name}
          </ColorCell>
        ))}
      </div>
    </div>
  )
}

export default StackColors
