import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
// import { useBuilderAssetsCss } from 'src/routes/BuilderRoute/widgets/BuilderAssets/hooks/useBuilderAssetsCss'
import { StackPanel } from '../../hooks/useStackCollector'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Button from '@/app/components/Button'
import InputText from '@/app/components/InputText/InputText'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/store/popouts.store'
import Plus from '@/app/svg/plus.svg'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useBuilderAssetsCss } from '@/builder/views/BuilderEditable/widgets/BuilderAssets/hooks/useBuilderAssetsCss'
import CssCell from '@/builder/components/CssCell/CssCell'
import { BuilderContext } from '@/builder/BuilderContext'

export interface StackPanelCssOverrideListOptions {
  selectKeys?: string[]
  onChange?: (keys: string[]) => void
}

interface StackPanelCssOverrideListProps extends StackPanel {
  className?: string
}

const StackPanelCssOverrideList: FC<StackPanelCssOverrideListProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ key, node, value }) => {
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
            [styles.active]: selectedList.includes(documentManager.keyOfEntity(variable))
          })}
          key={variable?.name}
          description={
            <Button
              className={styles.cellButton}
              mode='secondary'
              onClick={() => editCssOverride(documentManager.keyOfEntity(variable))}
            >
              Edit
            </Button>
          }
          onClick={() => clickItem(documentManager.keyOfEntity(variable))}
        >
          {variable?.name}
        </CssCell>
      ))}
    </div>
  )
}

export default StackPanelCssOverrideList
