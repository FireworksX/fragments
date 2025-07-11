import { VariantStatus } from '@/__generated__/types'
import { StatusBadgeProps } from '@/shared/ui/StatusBadge/ui/StatusBadge'

export const statusToIndicatorMap: Record<VariantStatus, StatusBadgeProps['status']> = {
  [VariantStatus.Inactive]: 'warning',
  [VariantStatus.Active]: 'success'
}

export const statusToLabel: Record<VariantStatus, string> = {
  INACTIVE: 'Pause',
  ACTIVE: 'Active'
}
