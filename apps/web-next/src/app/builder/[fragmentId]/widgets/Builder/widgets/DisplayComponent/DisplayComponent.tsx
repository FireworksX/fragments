import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { FragmentsRender } from '@fragments/render-react'
import { Component } from '@fragments/nodes'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import Touchable from '@/app/components/Touchable'
import PlusCircle from '@/app/svg/plus-circle.svg'
import BuilderFragmentWrapper from '@/app/builder/widgets/Builder/components/BuilderFragmentWrapper/BuilderFragmentWrapper'
import { useBuilderLayerRefs } from '@/app/builder/widgets/Builder/hooks/useBuilderLayerRefs'
import { useComponentVariants } from '@/app/builder/widgets/Builder/hooks/useComponentVariants'

interface BuilderDisplayComponentProps {
  className?: string
}

const DisplayComponent: FC<BuilderDisplayComponentProps> = ({ className }) => {
  const { graphState } = useContext(BuilderContext)
  const [{ focusComponent }] = useGraph(graphState)
  const [componentValue] = useGraph(graphState, focusComponent)
  const componentVariants: string[] = componentValue?.children ?? []
  const { onClick } = useBuilderLayerRefs()
  // const { addVariant } = useComponentVariants()

  return (
    <div className={cn(styles.root, className)}>
      {componentVariants.map(variantKey => (
        <BuilderFragmentWrapper key={variantKey} variantKey={variantKey}>
          <FragmentsRender
            FragmentNode={Component}
            graphState={graphState}
            componentKey={focusComponent}
            variantKey={variantKey}
            onClick={onClick}
          />
        </BuilderFragmentWrapper>
      ))}
      <Touchable TagName='button' className={styles.createVariant} onClick={() => componentValue.addVariant()}>
        <PlusCircle name='plus-circle' />
        Add variant
      </Touchable>
    </div>
  )
}

export default DisplayComponent
