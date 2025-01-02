import React, { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AssetsStyles } from '@/features/fragmentBuilder/AssetsStyles'
import { AssetsColors } from '@/features/fragmentBuilder/AssetsColors'
import { AssetsFragments } from '@/widgets/fragmentBuilder/BuilderAssets/widgets/AssetsFragments/AssetsFragments'

interface BuilderAssetsProps {
  className?: string
}

const BuilderAssets: FC<BuilderAssetsProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <AssetsStyles assetsColorsNode={<AssetsColors />} />
      <AssetsFragments />
    </div>
  )
}

export default BuilderAssets
