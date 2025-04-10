import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBuilderStyles } from '../hooks/useBuilderStyles'
import { Panel } from '@/shared/ui/Panel'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { BuilderOpacityControl } from '../components/BuilderOpacityControl'
import { BuilderVisibleControl } from '@/widgets/fragmentBuilder/BuilderStyles/components/BuilderVisibleControl'
import { BuilderFillControl } from '@/widgets/fragmentBuilder/BuilderStyles/components/BuilderFillControl'
import { BuilderOverflowControl } from '@/widgets/fragmentBuilder/BuilderStyles/components/BuilderOverflowControl'
import { BuilderRadiusControl } from '@/widgets/fragmentBuilder/BuilderStyles/components/BuilderRadiusControl'
import { BuilderBorderControl } from '@/widgets/fragmentBuilder/BuilderStyles/components/BuilderBorderControl'
import { BuilderZIndexControl } from '@/widgets/fragmentBuilder/BuilderStyles/components/BuilderZIndexControl'

interface BuilderStylesProps {
  className?: string
}

const BuilderStyles: FC<BuilderStylesProps> = ({ className }) => {
  const { zIndex, radius, fill, overflow, border } = useBuilderStyles()

  return (
    <Panel
      className={cn(styles.root, className)}
      title='Styles'
      aside={
        <Dropdown
          trigger='click'
          options={
            <DropdownGroup>
              {zIndex.hidden && <DropdownOption onClick={() => zIndex.update(1)}>Z Index</DropdownOption>}
            </DropdownGroup>
          }
        >
          <PanelHeadAside />
        </Dropdown>
      }
    >
      <BuilderOpacityControl />
      <BuilderVisibleControl />
      {!fill.hidden && <BuilderFillControl />}
      {!overflow.hidden && <BuilderOverflowControl />}
      {!radius.hidden && <BuilderRadiusControl />}
      {!border.hidden && <BuilderBorderControl />}
      {!zIndex.hidden && <BuilderZIndexControl />}
    </Panel>
  )
}

export default BuilderStyles
