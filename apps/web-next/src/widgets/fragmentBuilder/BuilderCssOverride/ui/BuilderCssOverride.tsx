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

interface BuilderCssOverrideProps {
  className?: string
}

const BuilderCssOverride: FC<BuilderCssOverrideProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph, hasCssOverride, cssOverride, variables, selectCss, onClick, removeVariable } =
    useBuilderCssOverride(documentManager)

  return (
    <Panel
      className={className}
      title='CSS Override'
      aside={<PanelHeadAside isOpen={hasCssOverride} onClick={onClick} />}
    >
      <AnimatedVisible visible={hasCssOverride}>
        <div className={styles.wrapper}>
          <ControlRow title='Variables'>
            <ControlRowWide>
              <InputSelect hasIcon={false} placeholder='Select...' onClick={selectCss} />
              {variables.value?.map(variableKey => (
                <GraphValue graphState={documentManager} field={variableKey}>
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
          <Textarea {...cssOverride} />
        </Panel>
      </AnimatedVisible>
    </Panel>
  )
}

export default BuilderCssOverride
