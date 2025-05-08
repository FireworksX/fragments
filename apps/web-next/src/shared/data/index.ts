import { createConstants } from '@fragmentsx/utils'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'

export const popoutNames = createConstants(
  'customBreakpoint',
  'stackSolidPaintStyle',
  'colorPicker',
  'stackStringProperty',
  'stackNumberProperty',
  'stackBooleanProperty',
  'stackColorProperty',
  'stackVariableTransform',
  'stackEvent'
)

export const droppableAreas = createConstants('builderPlaceholder', 'builderCanvas', 'builderCanvasNode')

export const draggableAreas = createConstants('projectTree')

export const draggableNodes = createConstants('fragmentProjectItem')

export const routerParams = createConstants('editMode')

export const modalNames = createConstants(
  'createProject',
  'createFragment',
  'createCampaign',
  'configureStream',
  'projectTree',
  'createCustomBreakpoint'
)

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

export const builderToasts = createConstants('inserting', 'saving')
