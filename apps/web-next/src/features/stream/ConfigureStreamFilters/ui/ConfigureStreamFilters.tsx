import { FC } from 'react'
import styles from './styles.module.css'
import { Panel } from '@/shared/ui/Panel'
import { Cell } from '@/shared/ui/Cell'
import { Chip } from '@/shared/ui/Chip/ui/Chip'

interface ConfigureStreamFiltersProps {}

export const ConfigureStreamFilters: FC<ConfigureStreamFiltersProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.tags}>
        <Chip prefix='Country:'>Russia, China, USA, Canada</Chip>
        <Chip prefix='Device type:'>Mobile</Chip>
        <Chip prefix='Device OS:'>iOS, Android</Chip>
      </div>
      <div className={styles.content}>
        <div className={styles.groups}>
          <Panel title='Date and time'>
            <Cell>Interval of dates</Cell>
            <Cell>Schedule</Cell>
          </Panel>
          <Panel title='Geo location'>
            <Cell>Country</Cell>
            <Cell>Region</Cell>
            <Cell>City</Cell>
          </Panel>
          <Panel title='Device'>
            <Cell>Type of device</Cell>
            <Cell>OS</Cell>
            <Cell>Browser</Cell>
          </Panel>
          <Panel title='Device'>
            <Cell>Type of device</Cell>
            <Cell>OS</Cell>
            <Cell>Browser</Cell>
          </Panel>
          <Panel title='Device'>
            <Cell>Type of device</Cell>
            <Cell>OS</Cell>
            <Cell>Browser</Cell>
          </Panel>
        </div>
      </div>
    </div>
  )
}
