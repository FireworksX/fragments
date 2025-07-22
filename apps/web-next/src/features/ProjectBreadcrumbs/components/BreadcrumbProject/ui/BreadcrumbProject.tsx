import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Avatar } from '@/shared/ui/Avatar'
import { Touchable } from '@/shared/ui/Touchable'
import { Link } from '@/shared/ui/Link'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import CheckIcon from '@/shared/icons/next/check.svg'
import PlusIcon from '@/shared/icons/next/circle-plus.svg'

interface BreadcrumbProjectProps {
  projects: { logo: { url: string }; id: number; name: string }[]
  currentProject: number
  className?: string
}

export const BreadcrumbProject: FC<BreadcrumbProjectProps> = ({ className, projects, currentProject }) => {
  const active = projects?.find(p => p.id === currentProject)

  return (
    <Dropdown
      trigger='click'
      placement='bottom-start'
      arrow={false}
      options={
        <DropdownGroup>
          {projects?.map(project => (
            <Link key={project.id} type='project' projectSlug={project.id}>
              <DropdownOption
                className={cn(styles.option, {
                  [styles.selected]: project.id === currentProject
                })}
                bodyClassName={styles.optionBody}
                // icon={<Avatar size={24} uniqueId={project?.id?.toString() ?? ''} />}
                suffix={project.id === currentProject && <CheckIcon />}
              >
                <Avatar
                  uniqueId={project?.id?.toString()}
                  firstName={project?.name}
                  withRadius
                  size={20}
                  src={project?.logo.url}
                />
                {project?.name}
              </DropdownOption>
            </Link>
          ))}
          <Link type='createProject'>
            <DropdownOption
              className={cn(styles.option, styles.createOption)}
              icon={<PlusIcon className={styles.createIcon} width={12} height={12} />}
            >
              Create project
            </DropdownOption>
          </Link>
        </DropdownGroup>
      }
    >
      {active && (
        <Touchable className={cn(styles.root, className)}>
          <Avatar
            uniqueId={active?.id?.toString()}
            firstName={active?.name}
            withRadius
            size={20}
            src={active?.logo.url}
          />
          {active?.name}
        </Touchable>
      )}
    </Dropdown>
  )
}
