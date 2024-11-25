import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderFragmentGrowing } from '../hooks/useBuilderFragmentGrowing'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Select } from '@/shared/ui/Select'

interface BuilderFragmentGrowingProps {
  className?: string
}

const BuilderFragmentGrowing: FC<BuilderFragmentGrowingProps> = ({ className }) => {
  const { isPrimaryLayer, options, vertical, horizontal } = useBuilderFragmentGrowing()
  //
  // if (!selectionGraph?.position && selectionGraph?._type !== builderNodes.Screen) {
  //   return null
  // }

  /**
   * Как рендерить фрагмент на странице.
   */
  return (
    <Panel className={cn(styles.root, className)} title='Growing'>
      <ControlRow title='Verical'>
        <ControlRowWide>
          <Select value={vertical.value} onChange={vertical.onChange}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Horizontal'>
        <ControlRowWide>
          <Select value={horizontal.value} onChange={horizontal.onChange}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}

export default BuilderFragmentGrowing
