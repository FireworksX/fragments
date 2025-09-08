import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderFragmentGrowing } from '../hooks/useBuilderFragmentGrowing'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { booleanTabsSelectorItems } from '@/shared/data'
import { definition } from '@fragmentsx/definition'

interface BuilderFragmentGrowingProps {
  className?: string
}

const BuilderFragmentGrowing: FC<BuilderFragmentGrowingProps> = ({ className }) => {
  const { options, vertical, horizontal } = useBuilderFragmentGrowing()
  //
  // if (!selectionGraph?.position && selectionGraph?._type !== builderNodes.Screen) {
  //   return null
  // }

  /**
   * Как рендерить фрагмент на странице.
   */
  return (
    <Panel className={cn(styles.root, className)} title='Growing'>
      <ControlRow title='X Fill'>
        <ControlRowWide>
          <TabsSelector
            items={booleanTabsSelectorItems}
            value={horizontal.value === definition.fragmentGrowingMode.fill}
            onChange={({ name }) =>
              horizontal.update(name ? definition.fragmentGrowingMode.fill : definition.fragmentGrowingMode.auto)
            }
          />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Y Fill'>
        <ControlRowWide>
          <TabsSelector
            items={booleanTabsSelectorItems}
            value={vertical.value === definition.fragmentGrowingMode.fill}
            onChange={({ name }) =>
              vertical.update(name ? definition.fragmentGrowingMode.fill : definition.fragmentGrowingMode.auto)
            }
          />
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default BuilderFragmentGrowing
