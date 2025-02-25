import { createConstants } from '@fragments/utils'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'

export const popoutNames = createConstants(
  'stackSolidPaintStyle',
  'colorPicker',
  'stackStringProperty',
  'stackNumberProperty',
  'stackBooleanProperty',
  'stackColorProperty',
  'stackVariableTransform'
)

export const routerParams = createConstants('editMode')

export const modalNames = createConstants('createProject', 'createFragment', 'createCampaign', 'configureStream')

export const booleanTabsSelectorItems: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const campaignTabs = createConstants('overview', 'streams')
