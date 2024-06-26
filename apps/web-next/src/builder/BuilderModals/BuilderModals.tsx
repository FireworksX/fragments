import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import CreateCustomBreakpoint from '@/app/widgets/modals/CreateCustomBreakpoint/CreateCustomBreakpoint'
import CreateComponentModal from '@/app/widgets/modals/CreateComponentModal/CreateComponentModal'

interface BuilderModalsProps {
  className?: string
}

export const BuilderModals: FC<BuilderModalsProps> = () => (
  <>
    <CreateCustomBreakpoint />
    <CreateComponentModal />
  </>
)
