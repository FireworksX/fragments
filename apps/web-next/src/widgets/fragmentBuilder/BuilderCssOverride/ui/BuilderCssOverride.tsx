import { FC, useContext } from 'react'
import { useBuilderCssOverride } from '../hooks/useBuilderCssOverride'
import { Panel } from '@/shared/ui/Panel'
import { PanelHeadAside } from '@/shared/ui/PanelHeadAside'
import { Textarea } from '@/shared/ui/Textarea'

interface BuilderCssOverrideProps {
  className?: string
}

const BuilderCssOverride: FC<BuilderCssOverrideProps> = ({ className }) => {
  const { cssOverride, rawValue, setCssOverride, onClickHeader } = useBuilderCssOverride()
  const isOpen = typeof rawValue === 'string'

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
