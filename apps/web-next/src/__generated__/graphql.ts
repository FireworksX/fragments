/* eslint-disable */
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
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
  JSON: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type CampaignPatch = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  logoId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CampaignPost = {
  active: Scalars['Boolean']['input'];
  deleted: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  logoId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
};

export enum DeviceTypeGet {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
  Tablet = 'TABLET'
}

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

export type FragmentPatch = {
  document?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

export type FragmentPost = {
  document: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
};

export type GeoLocationPost = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
};

export enum OsTypeGet {
  Android = 'ANDROID',
  Ios = 'IOS',
  Linux = 'LINUX',
  Macos = 'MACOS',
  Windows = 'WINDOWS'
}

export type ProjectPost = {
  logoId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export enum RoleGet {
  Admin = 'ADMIN',
  Designer = 'DESIGNER',
  Manager = 'MANAGER',
  Owner = 'OWNER'
}

export type StreamFragmentPatch = {
  fragmentId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  props?: InputMaybe<Scalars['JSON']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type StreamFragmentPost = {
  fragmentId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  props?: InputMaybe<Scalars['JSON']['input']>;
  streamId: Scalars['Int']['input'];
  weight: Scalars['Float']['input'];
};

export type StreamPatch = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  campaignId: Scalars['Int']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deviceTypes?: InputMaybe<Array<DeviceTypeGet>>;
  geoLocations?: InputMaybe<Array<GeoLocationPost>>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  osTypes?: InputMaybe<Array<OsTypeGet>>;
  pages?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrames?: InputMaybe<Array<TimeFramePost>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type StreamPost = {
  active: Scalars['Boolean']['input'];
  campaignId: Scalars['Int']['input'];
  deleted: Scalars['Boolean']['input'];
  deviceTypes?: InputMaybe<Array<DeviceTypeGet>>;
  geoLocations?: InputMaybe<Array<GeoLocationPost>>;
  name: Scalars['String']['input'];
  osTypes?: InputMaybe<Array<OsTypeGet>>;
  pages?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrames?: InputMaybe<Array<TimeFramePost>>;
  weight: Scalars['Float']['input'];
};

export type TimeFramePost = {
  fromTime: Scalars['DateTime']['input'];
  toTime: Scalars['DateTime']['input'];
};
