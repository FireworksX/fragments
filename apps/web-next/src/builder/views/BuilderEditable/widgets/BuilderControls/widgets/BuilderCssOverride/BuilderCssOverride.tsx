'use client'
import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StatexValue } from '@adstore/statex-react'
import { useStore } from '@nanostores/react'
import { useBuilderCssOverride } from './hooks/useBuilderCssOverride'
import InputSelect from '@/app/components/InputSelect/InputSelect'
import Textarea from '@/app/components/Textarea/Textarea'
import { GraphValue } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import Panel from '@/builder/components/Panel/Panel'
import PanelHeadAside from '@/builder/components/PanelHeadAside/PanelHeadAside'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { BuilderContext } from '@/builder/BuilderContext'
import { AnimatedVisible } from '@/app/components/AnimatedVisible/AnimatedVisible'
import { to } from '@react-spring/web'

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
