import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { Cell } from '@/shared/ui/Cell'
import { Button } from '@/shared/ui/Button'
import { VariableIcon } from '@/shared/ui/VariableIcon'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { definition } from '@fragments/definition'

interface BuilderVariableCellProps {
  variableKey?: LinkKey
  className?: string
  actionsClassName?: string
  onClick?: () => unknown
}

export const BuilderVariableCell: FC<BuilderVariableCellProps> = ({
  className,
  actionsClassName,
  variableKey,
  onClick
}) => {
  const { documentManager } = useBuilderDocument()
  const [variable] = useGraph(documentManager, variableKey)
  const [documentGraph] = useGraph(documentManager, documentManager.root)
  const Icon = <VariableIcon type={variable.type} />

  const description = {
    [definition.variableType.Object]: !!variable?.fields?.length && `Fields: ${variable?.fields?.length}`
  }[variable?.type]

  return (
    <Cell
      className={cn(styles.root, className)}
      data-testid='BuilderNumberVariable'
      description={
        <>
          <div className={styles.description}>{description}</div>
          <div className={cn(styles.actions, actionsClassName)}>
            <Button
              mode='secondary'
              onClick={e => {
                documentGraph.removeProp(variableKey)
              }}
            >
              Delete
            </Button>
          </div>
        </>
      }
      before={<div className={styles.iconWrapper}>{Icon}</div>}
      onClick={onClick}
    >
      {variable?.name}
    </Cell>
  )
}
