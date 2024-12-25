import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderLink } from '../hooks/useBuilderLink'
import { Panel } from '@/shared/ui/Panel'
import { Touchable } from '@/shared/ui/Touchable'
import MinusIcon from '@/shared/icons/next/minus.svg'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import PanelHeadAside from '@/shared/ui/PanelHeadAside/ui/PanelHeadAside'
import { InputText } from '@/shared/ui/InputText'
import { isValue } from '@fragments/utils'

interface BuilderLinkProps {
  className?: string
}

const BuilderLink: FC<BuilderLinkProps> = ({ className }) => {
  const { href, isNewTab, disabled, onClick } = useBuilderLink()
  const isEmpty = !isValue(href.value)

  if (disabled) {
    return null
  }

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Link'
      aside={<PanelHeadAside isOpen={!isEmpty} onClick={onClick} />}
    >
      {!isEmpty && (
        <>
          <ControlRow title='Link to'>
            <ControlRowWide>
              <InputText value={href.value} onChangeValue={href.onChange} />
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
