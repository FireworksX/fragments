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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: UserGet;
};

export type CampaignGet = {
  __typename?: 'CampaignGet';
  active: Scalars['Boolean']['output'];
  author: UserGet;
  deleted: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  projectId: Scalars['Int']['output'];
};

export type CampaignPatch = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CampaignPost = {
  active: Scalars['Boolean']['input'];
  deleted: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
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
  deviceType: DeviceType;
  toggled?: Maybe<Scalars['Boolean']['output']>;
  type: FilterType;
};

export type FilterDeviceTypePost = {
  deviceType: DeviceType;
  toggled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterGeoLocationGet = {
  __typename?: 'FilterGeoLocationGet';
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  region?: Maybe<Scalars['String']['output']>;
  toggled?: Maybe<Scalars['Boolean']['output']>;
  type: FilterType;
};

export type FilterGeoLocationPost = {
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
  toggled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterOsTypeGet = {
  __typename?: 'FilterOSTypeGet';
  osType: OsType;
  toggled?: Maybe<Scalars['Boolean']['output']>;
  type: FilterType;
};

export type FilterOsTypeGetFilterDeviceTypeGetFilterPageGetFilterGeoLocationGetFilterTimeFrameGet = FilterDeviceTypeGet | FilterGeoLocationGet | FilterOsTypeGet | FilterPageGet | FilterTimeFrameGet;

export type FilterOsTypePost = {
  osType: OsType;
  toggled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterPageGet = {
  __typename?: 'FilterPageGet';
  page: Scalars['String']['output'];
  toggled?: Maybe<Scalars['Boolean']['output']>;
  type: FilterType;
};

export type FilterPagePost = {
  page: Scalars['String']['input'];
  toggled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterTimeFrameGet = {
  __typename?: 'FilterTimeFrameGet';
  fromTime: Scalars['DateTime']['output'];
  toTime: Scalars['DateTime']['output'];
  toggled?: Maybe<Scalars['Boolean']['output']>;
  type: FilterType;
};

export type FilterTimeFramePost = {
  fromTime: Scalars['DateTime']['input'];
  toTime: Scalars['DateTime']['input'];
  toggled?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum FilterType {
  DeviceType = 'DeviceType',
  GeoLocationType = 'GeoLocationType',
  OsType = 'OSType',
  PageType = 'PageType',
  TimeFrameType = 'TimeFrameType'
}

export type FiltersPost = {
  deviceTypes?: InputMaybe<Array<FilterDeviceTypePost>>;
  geolocations?: InputMaybe<Array<FilterGeoLocationPost>>;
  osTypes?: InputMaybe<Array<FilterOsTypePost>>;
  pages?: InputMaybe<Array<FilterPagePost>>;
  timeFrames?: InputMaybe<Array<FilterTimeFramePost>>;
};

export type FragmentGet = {
  __typename?: 'FragmentGet';
  assets: Array<Scalars['String']['output']>;
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

export type LandingGet = {
  __typename?: 'LandingGet';
  active: Scalars['Boolean']['output'];
  deleted: Scalars['Boolean']['output'];
  fragment?: Maybe<FragmentGet>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  props?: Maybe<Scalars['JSON']['output']>;
  stream: StreamGet;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type LandingPatch = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  fragmentId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type LandingPost = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  fragmentId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
  streamId: Scalars['Int']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAvatar: UserGet;
  addCampaignLogo: CampaignGet;
  addFragmentAsset: FragmentGet;
  addProjectLogo: ProjectGet;
  addProjectPublicKey: ProjectGet;
  addUserToProject?: Maybe<Scalars['Void']['output']>;
  changeProjectPrivateKey: ProjectGet;
  changeUserRole?: Maybe<Scalars['Void']['output']>;
  createCampaign: CampaignGet;
  createDirectory: Array<ProjectDirectoryGet>;
  createFragment: FragmentGet;
  createLanding: LandingGet;
  createProject: ProjectGet;
  createStream: StreamGet;
  deleteDirectory?: Maybe<Scalars['Void']['output']>;
  deleteFragment?: Maybe<Scalars['Void']['output']>;
  deleteProjectPublicKey?: Maybe<Scalars['Void']['output']>;
  deleteStream?: Maybe<Scalars['Void']['output']>;
  feedback: FeedbackGet;
  login: AuthPayload;
  refresh: AuthPayload;
  removeFragmentAsset: FragmentGet;
  signup: AuthPayload;
  updateCampaign: CampaignGet;
  updateDirectory: Array<ProjectDirectoryGet>;
  updateFragment: FragmentGet;
  updateLanding: LandingGet;
  updateProject: ProjectGet;
  updateStream: StreamGet;
};


export type MutationAddAvatarArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationAddCampaignLogoArgs = {
  campaignId: Scalars['Int']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationAddFragmentAssetArgs = {
  file: Scalars['Upload']['input'];
  fragmentId: Scalars['Int']['input'];
};


export type MutationAddProjectLogoArgs = {
  file: Scalars['Upload']['input'];
  projectId: Scalars['Int']['input'];
};


export type MutationAddProjectPublicKeyArgs = {
  projectId: Scalars['Int']['input'];
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


export type MutationCreateCampaignArgs = {
  cmp: CampaignPost;
};


export type MutationCreateDirectoryArgs = {
  directory: ProjectDirectory;
};


export type MutationCreateFragmentArgs = {
  fg: FragmentPost;
};


export type MutationCreateLandingArgs = {
  landings: LandingPost;
};


export type MutationCreateProjectArgs = {
  pr: ProjectPost;
};


export type MutationCreateStreamArgs = {
  strm: StreamPost;
};


export type MutationDeleteDirectoryArgs = {
  directoryId: Scalars['Int']['input'];
};


export type MutationDeleteFragmentArgs = {
  fragmentId: Scalars['Int']['input'];
};


export type MutationDeleteProjectPublicKeyArgs = {
  projectId: Scalars['Int']['input'];
  publicKey: Scalars['String']['input'];
};


export type MutationDeleteStreamArgs = {
  streamId: Scalars['Int']['input'];
};


export type MutationFeedbackArgs = {
  fd: FeedbackPost;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveFragmentAssetArgs = {
  fragmentId: Scalars['Int']['input'];
  publicPath: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};


export type MutationUpdateCampaignArgs = {
  cmp: CampaignPatch;
};


export type MutationUpdateDirectoryArgs = {
  directory: ProjectDirectoryPatch;
};


export type MutationUpdateFragmentArgs = {
  fg: FragmentPatch;
};


export type MutationUpdateLandingArgs = {
  landing: LandingPatch;
};


export type MutationUpdateProjectArgs = {
  pr: ProjectPatch;
};


export type MutationUpdateStreamArgs = {
  strm: StreamPatch;
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
  campaigns: Array<CampaignGet>;
  id: Scalars['Int']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  members: Array<UserRoleGet>;
  name: Scalars['String']['output'];
  owner: UserGet;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKeys: Array<Scalars['String']['output']>;
  rootDirectoryId: Scalars['Int']['output'];
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
  campaign: Array<CampaignGet>;
  campaignByName: Array<CampaignGet>;
  clientLanding?: Maybe<LandingGet>;
  directory: Array<ProjectDirectoryGet>;
  filter: AllFiltersGet;
  fragment: Array<FragmentGet>;
  landing: Array<LandingGet>;
  profile: AuthPayload;
  project: Array<ProjectGet>;
  stream: Array<StreamGet>;
};


export type QueryCampaignArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  campgainId?: InputMaybe<Scalars['Int']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCampaignByNameArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
};


export type QueryDirectoryArgs = {
  directoryId: Scalars['Int']['input'];
};


export type QueryFilterArgs = {
  countries?: InputMaybe<Array<Scalars['String']['input']>>;
  regions?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryFragmentArgs = {
  fragmentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLandingArgs = {
  landingId?: InputMaybe<Scalars['Int']['input']>;
  streamId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProjectArgs = {
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStreamArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  campaignId?: InputMaybe<Scalars['Int']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  streamId?: InputMaybe<Scalars['Int']['input']>;
};

export type RegionGet = {
  __typename?: 'RegionGet';
  cities: Array<Scalars['String']['output']>;
  region: Scalars['String']['output'];
};

export enum RoleGet {
  Admin = 'ADMIN',
  Designer = 'DESIGNER',
  Manager = 'MANAGER',
  Owner = 'OWNER'
}

export type StreamGet = {
  __typename?: 'StreamGet';
  active: Scalars['Boolean']['output'];
  campaignId: Scalars['Int']['output'];
  deleted: Scalars['Boolean']['output'];
  filters: Array<FilterOsTypeGetFilterDeviceTypeGetFilterPageGetFilterGeoLocationGetFilterTimeFrameGet>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type StreamPatch = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  campaignId: Scalars['Int']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  filters?: InputMaybe<FiltersPost>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type StreamPost = {
  active: Scalars['Boolean']['input'];
  campaignId: Scalars['Int']['input'];
  deleted: Scalars['Boolean']['input'];
  filters?: InputMaybe<FiltersPost>;
  name: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};

export type UserGet = {
  __typename?: 'UserGet';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
};

export type UserRoleGet = {
  __typename?: 'UserRoleGet';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  role: RoleGet;
};
