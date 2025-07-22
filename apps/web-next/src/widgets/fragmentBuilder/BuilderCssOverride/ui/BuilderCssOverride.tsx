import { FC, useContext } from 'react'
import styles from './styles.module.css'
import { useBuilderCssOverride } from '../hooks/useBuilderCssOverride'
import { GraphValue } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { Panel } from '@/shared/ui/Panel'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Textarea } from '@/shared/ui/Textarea'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface BuilderCssOverrideProps {
  className?: string
}

const BuilderCssOverride: FC<BuilderCssOverrideProps> = ({ className }) => {
  const { cssOverride, setCssOverride, onClickHeader } = useBuilderCssOverride()
  const isOpen = typeof cssOverride === 'string'

  return (
    <Panel
      className={className}
      title='CSS Override'
      aside={<PanelHeadAside isOpen={isOpen} onClick={onClickHeader} />}
    >
      {isOpen && (
        <Panel>
          <Textarea value={cssOverride} onChangeValue={setCssOverride} />
        </Panel>
      )}
    </Panel>
  )
}

export default BuilderCssOverride
