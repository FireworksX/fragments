import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Cell from '@/builder/components/Cell/Cell'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import HashTagFillIcon from '@/app/svg/hashtag-fill.svg'
import ToggleFillIcon from '@/app/svg/toggle-fill.svg'
import BarHorizontalIcon from '@/app/svg/bar-horizontal.svg'
import TextFrameFillIcon from '@/app/svg/text-frame-fill.svg'
import Button from '@/app/components/Button'
import { builderVariableType } from '@fragments/fragments-plugin/performance'

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
  const { documentManager } = useContext(BuilderContext)
  const [variable] = useGraph(documentManager, variableKey)
  const [documentGraph] = useGraph(documentManager, documentManager.root)

  const IconTag = {
    [builderVariableType.Number]: <HashTagFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [builderVariableType.Boolean]: <ToggleFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />,
    [builderVariableType.Object]: <BarHorizontalIcon width={18} height={18} />,
    [builderVariableType.String]: <TextFrameFillIcon style={{ color: 'var(--primary)' }} width={22} height={22} />
  }[variable?.type]

  const description = {
    [builderVariableType.Object]: !!variable?.fields?.length && `Fields: ${variable?.fields?.length}`
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
                console.log('cell', e)
                e.preventDefault()
                e.stopPropagation()
                documentGraph.removeProp(variableKey)
              }}
            >
              Delete
            </Button>
          </div>
        </>
      }
      before={<div className={styles.iconWrapper}>{IconTag}</div>}
      onClick={onClick}
    >
      {variable?.name}
    </Cell>
  )
}
