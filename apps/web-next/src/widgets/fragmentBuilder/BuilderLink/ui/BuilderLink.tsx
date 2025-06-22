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
import { isValue } from '@fragmentsx/utils'

interface BuilderLinkProps {
  className?: string
}

const BuilderLink: FC<BuilderLinkProps> = ({ className }) => {
  const { href, isNewTab, onClick } = useBuilderLink()
  const isEmpty = !isValue(href.value)

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Link'
      aside={<PanelHeadAside isOpen={!isEmpty} onClick={onClick} />}
    >
      {!isEmpty && (
        <>
          <ControlRow
            title='Link to'
            hasConnector={!href.variable.disabled}
            variable={{
              link: href.variable.variableLink,
              actions: href.variable.actions,
              onClick: href.variable.editVariable,
              onReset: href.variable.resetVariable
            }}
          >
            <ControlRowWide>
              <InputText value={href.value} onChangeValue={href.onChange} />
            </ControlRowWide>
          </ControlRow>
          <ControlRow
            title='New tab'
            hasConnector={!isNewTab.variable.disabled}
            variable={{
              link: isNewTab.variable.variableLink,
              actions: isNewTab.variable.actions,
              onClick: isNewTab.variable.editVariable,
              onReset: isNewTab.variable.resetVariable
            }}
          >
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
