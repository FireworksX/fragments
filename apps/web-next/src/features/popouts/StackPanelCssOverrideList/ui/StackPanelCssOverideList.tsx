import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { popoutsStore } from '@/shared/store/popouts.store'
import Plus from '@/shared/icons/plus.svg'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderAssetsCss } from '@/shared/hooks/fragmentBuilder/useBuilderAssetsCss'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { InputText } from '@/shared/ui/InputText'
import { InputSelect } from '@/shared/ui/InputSelect'
import { CssCell } from '@/shared/ui/CssCell'
import { Button } from '@/shared/ui/Button'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export interface StackPanelCssOverrideListOptions {
  selectKeys?: string[]
  onChange?: (keys: string[]) => void
}

interface StackPanelCssOverrideListProps extends StackPanel {
  className?: string
}

const StackPanelCssOverrideList: FC<StackPanelCssOverrideListProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
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
