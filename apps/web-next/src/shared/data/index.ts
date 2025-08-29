import { createConstants } from '@fragmentsx/utils'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'

export const popoutNames = createConstants(
  'customBreakpoint',
  'stackSolidPaintStyle',
  'colorPicker',
  'imagePicker',
  'stackImageProperty',
  'stackStringProperty',
  'stackEnumProperty',
  'stackLinkProperty',
  'stackNumberProperty',
  'stackEventProperty',
  'stackBooleanProperty',
  'stackColorProperty',
  'stackObjectProperty',
  'stackArrayProperty',
  'stackGoalProperty',
  'stackVariableTransform',
  'stackInteraction',
  'stackGoals',
  'stackEvents',
  'stackCreateGoal',
  'stackFragmentProps',
  'stackObjectValue',
  'stackArrayValue'
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
  'createCustomBreakpoint',
  'goalView',
  'configureFeatureFlagVariant',
  'configureFragmentVariant',
  'configureCampaign',
  'inviteMember',
  'colorPicker',

  'propertyString',
  'propertyColor'
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
