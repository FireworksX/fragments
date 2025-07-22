export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type AllFiltersGet = {
  __typename?: 'AllFiltersGet';
  deviceTypes: Array<DeviceType>;
  geoLocations: Array<CountryGet>;
  osTypes: Array<OsType>;
};

export type AreaGet = {
  __typename?: 'AreaGet';
  areaCode: Scalars['String']['output'];
  author: UserGet;
  campaigns: Array<CampaignGet>;
  defaultCampaign: CampaignGet;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logo: MediaGet;
  projectId: Scalars['Int']['output'];
};

export type AreaPatch = {
  areaCode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

export type AreaPost = {
  areaCode: Scalars['String']['input'];
  defaultCampaignName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserGet;
};

export type CampaignGet = {
  __typename?: 'CampaignGet';
  areaId: Scalars['Int']['output'];
  author: UserGet;
  description?: Maybe<Scalars['String']['output']>;
  experiment?: Maybe<ExperimentGet>;
  featureFlag: FeatureFlagGet;
  id: Scalars['Int']['output'];
  logo: MediaGet;
  name: Scalars['String']['output'];
  status: CampaignStatus;
};

export type CampaignPatch = {
  description?: InputMaybe<Scalars['String']['input']>;
  experimentId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CampaignStatus>;
};

export type CampaignPost = {
  areaId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  experimentId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  status: CampaignStatus;
};

export enum CampaignStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE'
}

export type ClientGet = {
  __typename?: 'ClientGet';
  createdAt: Scalars['String']['output'];
  history: Array<ClientHistoryGet>;
  id: Scalars['Int']['output'];
  lastVisitedAt?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export enum ClientHistoryEventType {
  Contribute = 'CONTRIBUTE',
  Feedback = 'FEEDBACK',
  Init = 'INIT',
  Release = 'RELEASE',
  View = 'VIEW'
}

export type ClientHistoryGet = {
  __typename?: 'ClientHistoryGet';
  area?: Maybe<AreaGet>;
  browser?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  clientId: Scalars['Int']['output'];
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  deviceType?: Maybe<Scalars['Int']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  eventType: ClientHistoryEventType;
  id: Scalars['Int']['output'];
  language?: Maybe<Scalars['String']['output']>;
  osType?: Maybe<Scalars['Int']['output']>;
  pageLoadTime?: Maybe<Scalars['Float']['output']>;
  referrer?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  screenHeight?: Maybe<Scalars['Int']['output']>;
  screenWidth?: Maybe<Scalars['Int']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<VariantGet>;
};

export type ClientMetricPost = {
  metricType: ClientMetricType;
  metricValue?: InputMaybe<Scalars['String']['input']>;
};

export enum ClientMetricType {
  InitSession = 'INIT_SESSION',
  ReachProjectGoal = 'REACH_PROJECT_GOAL',
  ReleaseSession = 'RELEASE_SESSION'
}

export type ClientProjectGoalGet = {
  __typename?: 'ClientProjectGoalGet';
  client: ClientGet;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  project: ProjectGet;
  projectGoal: ProjectGoalGet;
};

export type ConditionGet = {
  __typename?: 'ConditionGet';
  filterData?: Maybe<FilterPageGetFilterDeviceTypeGetFilterOsTypeGetFilterTimeFramesGetFilterGeoLocationsGet>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ConditionPatch = {
  filterData?: InputMaybe<FilterPost>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ConditionPost = {
  filterData: FilterPost;
  name: Scalars['String']['input'];
};

export type ConditionSetGet = {
  __typename?: 'ConditionSetGet';
  conditions: Array<ConditionGet>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ConditionSetPatch = {
  conditions?: InputMaybe<Array<ConditionPost>>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ConditionSetPost = {
  conditions: Array<ConditionPost>;
  name: Scalars['String']['input'];
};

export type CountryGet = {
  __typename?: 'CountryGet';
  country: Scalars['String']['output'];
  regions: Array<RegionGet>;
};

export enum DeviceType {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
  Tablet = 'TABLET'
}

export type ExperimentGet = {
  __typename?: 'ExperimentGet';
  description?: Maybe<Scalars['String']['output']>;
  featureFlag: FeatureFlagGet;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status: ExperimentStatus;
};

export enum ExperimentStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE'
}

export type FeatureFlagGet = {
  __typename?: 'FeatureFlagGet';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  releaseCondition: ReleaseConditionGet;
  rotationType: RotationType;
  variants: Array<VariantGet>;
};

export type FeatureFlagPatch = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  releaseCondition?: InputMaybe<ReleaseConditionPatch>;
  rotationType?: InputMaybe<RotationType>;
  variants?: InputMaybe<Array<VariantPatch>>;
};

export type FeatureFlagPost = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  releaseCondition: ReleaseConditionPost;
  rotationType: RotationType;
  variants: Array<VariantPost>;
};

export type FeedbackGet = {
  __typename?: 'FeedbackGet';
  content?: Maybe<Scalars['String']['output']>;
  feel: FeelLevelGet;
  page: Scalars['String']['output'];
};

export type FeedbackPost = {
  content?: InputMaybe<Scalars['String']['input']>;
  feel: FeelLevelGet;
  page: Scalars['String']['input'];
};

export enum FeelLevelGet {
  Five = 'FIVE',
  Four = 'FOUR',
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO'
}

export type FilterDeviceTypeGet = {
  __typename?: 'FilterDeviceTypeGet';
  deviceTypes: Array<DeviceType>;
};

export type FilterGeoLocationGet = {
  __typename?: 'FilterGeoLocationGet';
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  region?: Maybe<Scalars['String']['output']>;
};

export type FilterGeoLocationPost = {
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
};

export type FilterGeoLocationsGet = {
  __typename?: 'FilterGeoLocationsGet';
  geoLocations: Array<FilterGeoLocationGet>;
};

export type FilterOsTypeGet = {
  __typename?: 'FilterOSTypeGet';
  osTypes: Array<OsType>;
};

export type FilterPageGet = {
  __typename?: 'FilterPageGet';
  pages: Array<Scalars['String']['output']>;
};

export type FilterPageGetFilterDeviceTypeGetFilterOsTypeGetFilterTimeFramesGetFilterGeoLocationsGet = FilterDeviceTypeGet | FilterGeoLocationsGet | FilterOsTypeGet | FilterPageGet | FilterTimeFramesGet;

export type FilterPost = {
  deviceTypes?: InputMaybe<Array<DeviceType>>;
  geoLocations?: InputMaybe<Array<FilterGeoLocationPost>>;
  osTypes?: InputMaybe<Array<OsType>>;
  pages?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrames?: InputMaybe<Array<FilterTimeFramePost>>;
};

export type FilterTimeFrameGet = {
  __typename?: 'FilterTimeFrameGet';
  fromTime: Scalars['DateTime']['output'];
  toTime: Scalars['DateTime']['output'];
};

export type FilterTimeFramePost = {
  fromTime: Scalars['DateTime']['input'];
  toTime: Scalars['DateTime']['input'];
};

export type FilterTimeFramesGet = {
  __typename?: 'FilterTimeFramesGet';
  timeFrames: Array<FilterTimeFrameGet>;
};

export type FragmentGet = {
  __typename?: 'FragmentGet';
  assets: Array<MediaGet>;
  author: UserGet;
  directoryId: Scalars['Int']['output'];
  document: Scalars['JSON']['output'];
  id: Scalars['Int']['output'];
  linkedFragments?: Maybe<Array<FragmentGet>>;
  name: Scalars['String']['output'];
  props?: Maybe<Scalars['JSON']['output']>;
};

export type FragmentPatch = {
  directoryId?: InputMaybe<Scalars['Int']['input']>;
  document?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['Int']['input'];
  linkedFragments?: InputMaybe<Array<Scalars['Int']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
};

export type FragmentPost = {
  directoryId: Scalars['Int']['input'];
  document: Scalars['JSON']['input'];
  linkedFragments?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

export type FragmentVariantGet = {
  __typename?: 'FragmentVariantGet';
  fragment: FragmentGet;
  props?: Maybe<Scalars['JSON']['output']>;
};

export type FragmentVariantPatch = {
  fragmentId: Scalars['Int']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

export type FragmentVariantPost = {
  fragmentId: Scalars['Int']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

export type MediaDelete = {
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaType: MediaType;
  targetId?: InputMaybe<Scalars['Int']['input']>;
};

export type MediaGet = {
  __typename?: 'MediaGet';
  mediaId: Scalars['Int']['output'];
  mediaType: MediaType;
  publicPath: Scalars['String']['output'];
};

export type MediaPost = {
  directoryId?: InputMaybe<Scalars['Int']['input']>;
  mediaType: MediaType;
  targetId?: InputMaybe<Scalars['Int']['input']>;
};

export enum MediaType {
  AreaLogo = 'AREA_LOGO',
  CampaignLogo = 'CAMPAIGN_LOGO',
  FragmentAsset = 'FRAGMENT_ASSET',
  ProjectLogo = 'PROJECT_LOGO',
  UserLogo = 'USER_LOGO'
}

export type Mutation = {
  __typename?: 'Mutation';
  addClientMetric?: Maybe<Scalars['Void']['output']>;
  addProjectPublicKey: ProjectGet;
  addUserToProject?: Maybe<Scalars['Void']['output']>;
  changeProjectPrivateKey: ProjectGet;
  changeUserRole?: Maybe<Scalars['Void']['output']>;
  createArea: AreaGet;
  createCampaign: CampaignGet;
  createCondition: ConditionGet;
  createConditionSet: ConditionSetGet;
  createDirectory: Array<ProjectDirectoryGet>;
  createFeatureFlag: FeatureFlagGet;
  createFragment: FragmentGet;
  createProject: ProjectGet;
  createProjectGoal: ProjectGoalGet;
  createReleaseCondition: ReleaseConditionGet;
  createVariant: VariantGet;
  deleteArea?: Maybe<Scalars['Void']['output']>;
  deleteAsset?: Maybe<Scalars['Void']['output']>;
  deleteCampaign?: Maybe<Scalars['Void']['output']>;
  deleteCondition?: Maybe<Scalars['Void']['output']>;
  deleteConditionSet?: Maybe<Scalars['Void']['output']>;
  deleteDirectory?: Maybe<Scalars['Void']['output']>;
  deleteFeatureFlag?: Maybe<Scalars['Void']['output']>;
  deleteFragment?: Maybe<Scalars['Void']['output']>;
  deleteProject?: Maybe<Scalars['Void']['output']>;
  deleteProjectGoal?: Maybe<Scalars['Void']['output']>;
  deleteProjectPublicKey?: Maybe<Scalars['Void']['output']>;
  deleteReleaseCondition?: Maybe<Scalars['Void']['output']>;
  deleteVariant?: Maybe<Scalars['Void']['output']>;
  feedback: FeedbackGet;
  login: AuthPayload;
  normalizeVariantsRolloutPercentage?: Maybe<Scalars['Void']['output']>;
  refresh: AuthPayload;
  signup: AuthPayload;
  updateArea: AreaGet;
  updateCampaign: CampaignGet;
  updateCondition: ConditionGet;
  updateConditionSet: ConditionSetGet;
  updateDirectory: Array<ProjectDirectoryGet>;
  updateFeatureFlag: FeatureFlagGet;
  updateFragment: FragmentGet;
  updateProject: ProjectGet;
  updateProjectGoal: ProjectGoalGet;
  updateReleaseCondition: ReleaseConditionGet;
  updateVariant: VariantGet;
  uploadAsset: MediaGet;
};


export type MutationAddClientMetricArgs = {
  metric: ClientMetricPost;
};


export type MutationAddProjectPublicKeyArgs = {
  projectId: Scalars['Int']['input'];
  publicKeyName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddUserToProjectArgs = {
  projectId: Scalars['Int']['input'];
  role: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationChangeProjectPrivateKeyArgs = {
  projectId: Scalars['Int']['input'];
};


export type MutationChangeUserRoleArgs = {
  projectId: Scalars['Int']['input'];
  role: RoleGet;
  userId: Scalars['Int']['input'];
};


export type MutationCreateAreaArgs = {
  area: AreaPost;
};


export type MutationCreateCampaignArgs = {
  cmp: CampaignPost;
};


export type MutationCreateConditionArgs = {
  condition: ConditionPost;
  conditionSetId: Scalars['Int']['input'];
};


export type MutationCreateConditionSetArgs = {
  conditionSet: ConditionSetPost;
  releaseConditionId: Scalars['Int']['input'];
};


export type MutationCreateDirectoryArgs = {
  directory: ProjectDirectory;
};


export type MutationCreateFeatureFlagArgs = {
  featureFlag: FeatureFlagPost;
};


export type MutationCreateFragmentArgs = {
  fg: FragmentPost;
};


export type MutationCreateProjectArgs = {
  pr: ProjectPost;
};


export type MutationCreateProjectGoalArgs = {
  goal: ProjectGoalPost;
};


export type MutationCreateReleaseConditionArgs = {
  releaseCondition: ReleaseConditionPost;
};


export type MutationCreateVariantArgs = {
  variant: VariantPost;
};


export type MutationDeleteAreaArgs = {
  areaId: Scalars['Int']['input'];
};


export type MutationDeleteAssetArgs = {
  media: MediaDelete;
};


export type MutationDeleteCampaignArgs = {
  campaignId: Scalars['Int']['input'];
};


export type MutationDeleteConditionArgs = {
  conditionId: Scalars['Int']['input'];
};


export type MutationDeleteConditionSetArgs = {
  conditionSetId: Scalars['Int']['input'];
};


export type MutationDeleteDirectoryArgs = {
  directoryId: Scalars['Int']['input'];
};


export type MutationDeleteFeatureFlagArgs = {
  featureFlagId: Scalars['Int']['input'];
};


export type MutationDeleteFragmentArgs = {
  fragmentId: Scalars['Int']['input'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Int']['input'];
};


export type MutationDeleteProjectGoalArgs = {
  goalId: Scalars['Int']['input'];
};


export type MutationDeleteProjectPublicKeyArgs = {
  projectId: Scalars['Int']['input'];
  publicKeyId: Scalars['Int']['input'];
};


export type MutationDeleteReleaseConditionArgs = {
  releaseConditionId: Scalars['Int']['input'];
};


export type MutationDeleteVariantArgs = {
  variantId: Scalars['Int']['input'];
};


export type MutationFeedbackArgs = {
  fd: FeedbackPost;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNormalizeVariantsRolloutPercentageArgs = {
  featureFlagId: Scalars['Int']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};


export type MutationUpdateAreaArgs = {
  area: AreaPatch;
};


export type MutationUpdateCampaignArgs = {
  cmp: CampaignPatch;
};


export type MutationUpdateConditionArgs = {
  condition: ConditionPatch;
};


export type MutationUpdateConditionSetArgs = {
  conditionSet: ConditionSetPatch;
};


export type MutationUpdateDirectoryArgs = {
  directory: ProjectDirectoryPatch;
};


export type MutationUpdateFeatureFlagArgs = {
  featureFlag: FeatureFlagPatch;
};


export type MutationUpdateFragmentArgs = {
  fg: FragmentPatch;
};


export type MutationUpdateProjectArgs = {
  pr: ProjectPatch;
};


export type MutationUpdateProjectGoalArgs = {
  goal: ProjectGoalPatch;
};


export type MutationUpdateReleaseConditionArgs = {
  releaseCondition: ReleaseConditionPatch;
};


export type MutationUpdateVariantArgs = {
  variant: VariantPatch;
};


export type MutationUploadAssetArgs = {
  file: Scalars['Upload']['input'];
  media: MediaPost;
};

export enum OsType {
  Android = 'ANDROID',
  Ios = 'IOS',
  Linux = 'LINUX',
  Macos = 'MACOS',
  Windows = 'WINDOWS'
}

export type ProjectDirectory = {
  name: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
  projectId: Scalars['Int']['input'];
};

export type ProjectDirectoryGet = {
  __typename?: 'ProjectDirectoryGet';
  fragments: Array<FragmentGet>;
  hasFragments: Scalars['Boolean']['output'];
  hasSubdirectories: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  projectId: Scalars['Int']['output'];
};

export type ProjectDirectoryPatch = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectGet = {
  __typename?: 'ProjectGet';
  areas: Array<AreaGet>;
  id: Scalars['Int']['output'];
  logo: MediaGet;
  members: Array<UserRoleGet>;
  name: Scalars['String']['output'];
  owner: UserGet;
  privateKey?: Maybe<ProjectKeyGet>;
  publicKeys: Array<ProjectKeyGet>;
  rootDirectoryId: Scalars['Int']['output'];
};

export type ProjectGoalGet = {
  __typename?: 'ProjectGoalGet';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  targetAction: Scalars['String']['output'];
};

export type ProjectGoalPatch = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  targetAction?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectGoalPost = {
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  targetAction: Scalars['String']['input'];
};

export type ProjectKeyGet = {
  __typename?: 'ProjectKeyGet';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type ProjectPatch = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectPost = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  area: Array<AreaGet>;
  campaign: Array<CampaignGet>;
  client: Array<ClientGet>;
  clientArea?: Maybe<VariantGet>;
  clientFragment?: Maybe<FragmentGet>;
  clientHistory: Array<ClientHistoryGet>;
  condition: ConditionGet;
  conditionSet: ConditionSetGet;
  contributionsToProjectGoal: Array<ClientProjectGoalGet>;
  directory: Array<ProjectDirectoryGet>;
  featureFlag: FeatureFlagGet;
  filter: AllFiltersGet;
  fragment: Array<FragmentGet>;
  profile: AuthPayload;
  project: Array<ProjectGet>;
  projectGoals: Array<ProjectGoalGet>;
  releaseCondition: ReleaseConditionGet;
  variant: Array<VariantGet>;
};


export type QueryAreaArgs = {
  areaId?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCampaignArgs = {
  areaId?: InputMaybe<Scalars['Int']['input']>;
  campaignId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CampaignStatus>;
  withoutDefault?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryClientArgs = {
  clientId?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryClientAreaArgs = {
  areaCode: Scalars['String']['input'];
};


export type QueryClientFragmentArgs = {
  fragmentId: Scalars['Int']['input'];
};


export type QueryClientHistoryArgs = {
  clientId: Scalars['Int']['input'];
};


export type QueryConditionArgs = {
  conditionId: Scalars['Int']['input'];
};


export type QueryConditionSetArgs = {
  conditionSetId: Scalars['Int']['input'];
};


export type QueryContributionsToProjectGoalArgs = {
  projectGoalId: Scalars['Int']['input'];
  projectId: Scalars['Int']['input'];
};


export type QueryDirectoryArgs = {
  directoryId: Scalars['Int']['input'];
};


export type QueryFeatureFlagArgs = {
  featureFlagId: Scalars['Int']['input'];
};


export type QueryFilterArgs = {
  countries?: InputMaybe<Array<Scalars['String']['input']>>;
  regions?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryFragmentArgs = {
  fragmentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProjectArgs = {
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProjectGoalsArgs = {
  projectId: Scalars['Int']['input'];
};


export type QueryReleaseConditionArgs = {
  releaseConditionId: Scalars['Int']['input'];
};


export type QueryVariantArgs = {
  featureFlagId?: InputMaybe<Scalars['Int']['input']>;
  variantId?: InputMaybe<Scalars['Int']['input']>;
};

export type RegionGet = {
  __typename?: 'RegionGet';
  cities: Array<Scalars['String']['output']>;
  region: Scalars['String']['output'];
};

export type ReleaseConditionGet = {
  __typename?: 'ReleaseConditionGet';
  conditionSets: Array<ConditionSetGet>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ReleaseConditionPatch = {
  conditionSets?: InputMaybe<Array<ConditionSetPost>>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ReleaseConditionPost = {
  conditionSets: Array<ConditionSetPost>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
};

export enum RoleGet {
  Admin = 'ADMIN',
  Designer = 'DESIGNER',
  Manager = 'MANAGER',
  Owner = 'OWNER'
}

export enum RotationType {
  Keep = 'KEEP',
  Rotate = 'ROTATE'
}

export type UserGet = {
  __typename?: 'UserGet';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  logo: MediaGet;
};

export type UserRoleGet = {
  __typename?: 'UserRoleGet';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  logo: MediaGet;
  role: RoleGet;
};

export type VariantGet = {
  __typename?: 'VariantGet';
  fragment?: Maybe<FragmentVariantGet>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rolloutPercentage: Scalars['Float']['output'];
  status: VariantStatus;
};

export type VariantPatch = {
  fragment?: InputMaybe<FragmentVariantPatch>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  rolloutPercentage?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<VariantStatus>;
};

export type VariantPost = {
  featureFlagId: Scalars['Int']['input'];
  fragment: FragmentVariantPost;
  name: Scalars['String']['input'];
  rolloutPercentage: Scalars['Float']['input'];
  status: VariantStatus;
};

export enum VariantStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}
