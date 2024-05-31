'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StatexValue } from '@adstore/statex-react'
import { useStore } from '@nanostores/react'
import { useBuilderCssOverride } from './hooks/useBuilderCssOverride'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import ControlRow from '@/app/builder/widgets/Builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/app/builder/widgets/Builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import PanelHeadAside from '@/app/builder/widgets/Builder/components/PanelHeadAside/PanelHeadAside'
import { $statex } from 'src/store/builderRouterStore'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Textarea from '@/app/components/Textarea/Textarea'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { GraphValue } from '@graph-state/react'

interface BuilderCssOverrideProps {
  className?: string
}

const BuilderCssOverride: FC<BuilderCssOverrideProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const { isEmpty, css, variables, selectCss, onClick, removeVariable } = useBuilderCssOverride()

  return (
    <Panel className={className} title='CSS Override' aside={<PanelHeadAside isOpen={!isEmpty} onClick={onClick} />}>
      {!isEmpty && (
        <>
          <div className={styles.wrapper}>
            <ControlRow title='Variables'>
              <ControlRowWide>
                <InputSelect hasIcon={false} placeholder='Select...' onClick={selectCss} />
                {variables.value.map(variableKey => (
                  <GraphValue graphState={graphState} field={variableKey}>
                    {variable => (
                      <InputSelect
                        key={variable?.name}
                        hasIcon={false}
                        onClick={selectCss}
                        onReset={() => removeVariable(variableKey)}
                      >
                        {variable?.name}
                      </InputSelect>
                    )}
                  </GraphValue>
                ))}
              </ControlRowWide>
            </ControlRow>
          </div>

          <Panel>
            <Textarea {...css} />
          </Panel>
        </>
      )}
    </Panel>
  )
}

export default BuilderCssOverride
