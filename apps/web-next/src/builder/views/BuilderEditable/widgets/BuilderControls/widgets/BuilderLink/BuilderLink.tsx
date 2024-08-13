'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderLink } from './hooks/useBuilderLink'
import Touchable from '@/app/components/Touchable'
import TabsSelector from '@/app/components/TabsSelector'
import SelectMimicry from '@/app/components/SelectMimicry/SelectMimicry'
import Minus from '@/app/svg/minus.svg'
import Plus from '@/app/svg/plus.svg'
import { builderNodes } from '@fragments/fragments-plugin'
import Panel from '@/builder/components/Panel/Panel'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'

interface BuilderLinkProps {
  className?: string
}

const BuilderLink: FC<BuilderLinkProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph, href, isNewTab, onClick } = useBuilderLink(documentManager)
  const isEmpty = !href.value

  if (![builderNodes.Frame, builderNodes.ComponentVariant].some(type => type === selectionGraph?._type)) {
    return null
  }

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
