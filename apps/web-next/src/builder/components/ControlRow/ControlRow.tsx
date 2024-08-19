import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import RenderDropdown, { RenderDropdownProps } from '@/app/components/RenderDropdown/RenderDropdown'

interface BuilderControlRowProps extends PropsWithChildren {
  title?: string
  className?: string
  actions?: RenderDropdownProps['options']
  hasConnector?: boolean
  isHighlight?: boolean
  property?: ComponentProperty
  onResetProperty?: () => void
}

const ControlRow: FC<BuilderControlRowProps> = ({
  className,
  title,
  hasConnector,
  isHighlight,
  children,
  property,
  actions = [],
  onResetProperty
}) => {
  const hasActions = actions.some(action => action.length > 0)

  return (
    <div className={cn(styles.root, className)}>
      <RenderDropdown disabled={!hasActions} trigger='click' options={actions}>
        <div
          className={cn(styles.titleWrapper, {
            [styles.highlight]: isHighlight || hasActions,
            [styles.withAction]: hasActions
          })}
        >
          {hasConnector && (
            <Touchable>
              <Icon name='plus' width={11} height={11} />
            </Touchable>
          )}
          <div className={styles.title}>{title}</div>
        </div>
      </RenderDropdown>

      {children}
      {/*{property ? (*/}
      {/*  // <StatexValue statex={statex} field={property}>*/}
      {/*  //   {value => (*/}
      {/*      <ControlRowWide>*/}
      {/*        /!*<InputSelectComponentProperty mode='contrast' propertyType={value.type} onReset={onResetProperty}>*!/*/}
      {/*        /!*  {value?.name}*!/*/}
      {/*        /!*</InputSelectComponentProperty>*!/*/}
      {/*      </ControlRowWide>*/}
      {/*    )}*/}
      {/*  /!*</StatexValue>*!/*/}
      {/*) : (*/}
      {/*  children*/}
      {/*)}*/}
    </div>
  )
}

export default ControlRow
