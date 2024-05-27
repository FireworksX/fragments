import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import Touchable from '@/app/components/Touchable'
import Icon from '@adstore/web/src/components/Icon/Icon'

interface BuilderBreadcrumbsProps {
  className?: string
}

const Breadcrumbs: FC<BuilderBreadcrumbsProps> = ({ className }) => {
  const { list } = useBreadcrumbs()

  return (
    <div className={cn(styles.root, className)}>
      {list.map((crumb, index) => (
        <>
          <Touchable
            TagName='button'
            className={cn(styles.crumb, {
              [styles.component]: crumb.isComponent
            })}
            key={crumb.label}
            onClick={crumb.onClick}
          >
            {crumb.isComponent && <Icon name='component-frame' width={10} />}
            {crumb.label}
          </Touchable>
          {index < list.length - 1 && <Icon name='caret-right' width={11} />}
        </>
      ))}
    </div>
  )
}

export default Breadcrumbs
