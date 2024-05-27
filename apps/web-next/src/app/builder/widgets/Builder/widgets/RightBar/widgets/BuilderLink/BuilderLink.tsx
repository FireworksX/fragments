'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderLink } from './hooks/useBuilderLink'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { useStore } from '@nanostores/react'
import Touchable from '@/app/components/Touchable'
import BuilderPanel from '@adstore/web/src/routes/BuilderRoute/components/BuilderPanel/BuilderPanel'
import TabsSelector from '@/app/components/TabsSelector'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import Icon from '@adstore/web/src/components/Icon/Icon'
import Minus from '@/app/svg/minus.svg'
import Plus from '@/app/svg/plus.svg'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

interface BuilderLinkProps {
  className?: string
}

const BuilderLink: FC<BuilderLinkProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const { href, isNewTab, onClick } = useBuilderLink()
  const isEmpty = href.value === graphState.empty

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Link'
      aside={
        <Touchable tagName='button' onClick={onClick}>
          {!isEmpty ? <Minus width={14} height={14} /> : <Plus width={14} height={14} />}
        </Touchable>
      }
    >
      {!isEmpty && (
        <>
          <ControlRow title='Link to'>
            <ControlRowWide>
              <SelectMimicry />
            </ControlRowWide>
          </ControlRow>
          <ControlRow title='New tab' isHighlight={isNewTab.isOverride} actions={isNewTab.actions}>
            <ControlRowWide>
              <TabsSelector
                items={isNewTab.items}
                value={isNewTab.value}
                onChange={({ name }) => isNewTab.onChange(name)}
              />
            </ControlRowWide>
          </ControlRow>
        </>
      )}
    </Panel>
  )
}

export default BuilderLink
