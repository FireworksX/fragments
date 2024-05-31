import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
// import { useBuilderAssetsCss } from 'src/routes/BuilderRoute/widgets/BuilderAssets/hooks/useBuilderAssetsCss'
import { StackPanel } from '../../hooks/useStackCollector'
import { useStore } from '@nanostores/react'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import CssCell from '@/app/builder/widgets/Builder/components/CssCell/CssCell'
import Button from '@/app/components/Button'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import InputText from '@/app/components/InputText/InputText'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/stories/popouts.store'
import { useBuilderAssetsCss } from '@/app/builder/widgets/Builder/widgets/Assets/hooks/useBuilderAssetsCss'
import Plus from '@/app/svg/plus.svg'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export interface StackPanelCssOverrideListOptions {
  selectKeys?: string[]
  onChange?: (keys: string[]) => void
}

interface StackPanelCssOverrideListProps extends StackPanel {
  className?: string
}

const StackPanelCssOverrideList: FC<StackPanelCssOverrideListProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const layerInvoker = useLayerInvokerNew(selection, ({ key, node, value }) => {
    switch (key) {
      case 'cssLinks':
        node.setCssLinks(value)
        break
    }
  })
  const cssLinksInvoker = layerInvoker('cssLinks')
  const [search, setSearch] = useState('')
  const { cssVariables, editCssOverride, createCssOverride } = useBuilderAssetsCss()
  const selectedList = cssLinksInvoker.value || []
  const filtered = useMemo(() => cssVariables.filter(({ name }) => name?.search(search) !== -1), [cssVariables, search])

  const clickItem = (variableKey: string) => {
    const nextList = selectedList.includes(variableKey)
      ? selectedList.filter(id => id !== variableKey)
      : [...selectedList, variableKey]

    cssLinksInvoker.onChange(nextList)
  }

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.searchWrapper}>
        <InputText placeholder='Search' value={search} onChange={setSearch} />
      </div>

      <InputSelect
        className={styles.newCell}
        color='var(--border)'
        icon={<Plus name='plus' width={15} height={15} />}
        placeholder='New css override'
        onClick={() => createCssOverride({ onSubmit: popoutsStore.goPrev })}
      />

      {filtered.map(variable => (
        <CssCell
          className={cn(styles.cell, {
            [styles.active]: selectedList.includes(graphState.keyOfEntity(variable))
          })}
          key={variable?.name}
          description={
            <Button
              className={styles.cellButton}
              mode='secondary'
              onClick={() => editCssOverride(graphState.keyOfEntity(variable))}
            >
              Edit
            </Button>
          }
          onClick={() => clickItem(graphState.keyOfEntity(variable))}
        >
          {variable?.name}
        </CssCell>
      ))}
    </div>
  )
}

export default StackPanelCssOverrideList
