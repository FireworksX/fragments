/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation AuthLogin($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthLoginDocument,
    "\n  query ProjectBreadcrumb($projectId: Int!) {\n    project(projectId: $projectId) {\n      name\n    }\n  }\n": types.ProjectBreadcrumbDocument,
    "\n  mutation ChangeCampaignActive($campaignSlug: Int!, $active: Boolean!) {\n    updateCampaign(cmp: { id: $campaignSlug, active: $active }) {\n      id\n      active\n    }\n  }\n": types.ChangeCampaignActiveDocument,
    "\n  query CampaignDetail($campaignSlug: Int!) {\n    campaign(campgainId: $campaignSlug) {\n      id\n      name\n      description\n      active\n      author {\n        firstName\n        lastName\n      }\n    }\n  }\n": types.CampaignDetailDocument,
    "\n  mutation ChangeStreamActive($streamSlug: Int!, $campaignSlug: Int!, $active: Boolean!) {\n    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active }) {\n      id\n      active\n    }\n  }\n": types.ChangeStreamActiveDocument,
    "\n  mutation UpdateStream($streamSlug: Int!, $campaignSlug: Int!, $name: String, $active: Boolean) {\n    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active, name: $name }) {\n      id\n      active\n      name\n    }\n  }\n": types.UpdateStreamDocument,
    "\n  query StreamDetail($streamSlug: Int!) {\n    stream(streamId: $streamSlug) {\n      id\n      name\n      active\n      weight\n    }\n  }\n": types.StreamDetailDocument,
    "\nquery FragmentDocument($fragmentSlug: Int!) {\n    fragment(fragmentIds: [$fragmentSlug]) {\n        id\n        name\n        document\n    }\n}\n": types.FragmentDocumentDocument,
    "\nmutation UpdateFragmentDocument($fragmentSlug: Int!, $name: String, $document: JSON) {\n    updateFragment(fg: {id: $fragmentSlug, name: $name, document: $document}) {\n        id\n        name\n        document\n    }\n}\n": types.UpdateFragmentDocumentDocument,
    "\n  query Project($projectSlug: Int!) {\n    project(projectId: $projectSlug) {\n      id\n      name\n      rootDirectory {\n        id\n        hasSubdirectories\n      }\n    }\n  }\n": types.ProjectDocument,
    "\n  mutation CreateProjectDirectory($projectSlug: Int!, $name: String!, $parentId: Int!) {\n    createDirectory(directory: { projectId: $projectSlug, name: $name, parentId: $parentId }) {\n      id\n      name\n      parentId\n    }\n  }\n": types.CreateProjectDirectoryDocument,
    "\n  mutation CreateProjectFragment($projectSlug: Int!, $name: String!, $parentId: Int!) {\n    createFragment(fg: { name: $name, projectId: $projectSlug, document: \"{}\", directoryId: $parentId }) {\n      id\n      name\n      directoryId\n    }\n  }\n": types.CreateProjectFragmentDocument,
    "\n  mutation DeleteProjectDirectory($directoryId: Int!) {\n    deleteDirectory(directoryId: $directoryId)\n  }\n": types.DeleteProjectDirectoryDocument,
    "\n  mutation DeleteProjectFragment($fragmentId: Int!) {\n    deleteFragment(fragmentId: $fragmentId)\n  }\n": types.DeleteProjectFragmentDocument,
    "\n  fragment Directory on ProjectDirectoryGet {\n    id\n    parentId\n    name\n    hasSubdirectories\n    directories {\n      id\n      parentId\n      name\n      hasSubdirectories\n    }\n    fragments {\n      id\n      name\n    }\n  }\n": types.DirectoryFragmentDoc,
    "\n  query ProjectDirectory($directoryId: Int!) {\n    directory(directoryId: $directoryId) {\n      id\n      parentId\n      name\n      hasSubdirectories\n      directories {\n        id\n        parentId\n        name\n        hasSubdirectories\n      }\n      fragments {\n        id\n        name\n      }\n    }\n  }\n": types.ProjectDirectoryDocument,
    "\n  mutation UpdateProjectDirectory($directoryId: Int!, $name: String) {\n    updateDirectory(directory: { id: $directoryId, name: $name }) {\n      id\n      name\n    }\n  }\n": types.UpdateProjectDirectoryDocument,
    "\n  mutation UpdateProjectFragment($fragmentId: Int!, $name: String) {\n    updateFragment(fg: { id: $fragmentId, name: $name }) {\n      id\n      name\n    }\n  }\n": types.UpdateProjectFragmentDocument,
    "\n  mutation AuthSignIn($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthSignInDocument,
    "\n  query CurrentProfile {\n    profile {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.CurrentProfileDocument,
    "\n    mutation AuthLogin($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        accessToken\n        refreshToken\n      }\n    }\n": types.AuthLoginDocument,
    "\n  mutation AuthSignUp ($email: String!, $password: String!, $firstName: String!, $lastName: String) {\n    signup (email: $email, password: $password, firstName: $firstName, lastName: $lastName) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthSignUpDocument,
    "\n  query ListSteams($campaignSlug: Int!) {\n    stream(campaignId: $campaignSlug) {\n      id\n      weight\n      name\n      active\n    }\n  }\n": types.ListSteamsDocument,
    "\n  query CampaignsList($projectId: Int!) {\n    campaign(projectId: $projectId) {\n      id\n      name\n      active\n      description\n    }\n  }\n": types.CampaignsListDocument,
    "\n  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {\n    createCampaign(\n      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }\n    ) {\n      active\n      name\n      description\n    }\n  }\n": types.CreateCampaignDocument,
    "\n  query FragmentsNames($projectSlug: Int!, $fragmentIds: [Int!]) {\n    fragment(projectId: $projectSlug, fragmentIds: $fragmentIds) {\n      id\n      name\n    }\n  }\n": types.FragmentsNamesDocument,
    "\n  mutation CreateProject($name: String!) {\n    createProject(pr: { name: $name }) {\n      name\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  query ProjectsList {\n    project {\n      id\n      name\n    }\n  }\n": types.ProjectsListDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthLogin($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthLogin($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProjectBreadcrumb($projectId: Int!) {\n    project(projectId: $projectId) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query ProjectBreadcrumb($projectId: Int!) {\n    project(projectId: $projectId) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeCampaignActive($campaignSlug: Int!, $active: Boolean!) {\n    updateCampaign(cmp: { id: $campaignSlug, active: $active }) {\n      id\n      active\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeCampaignActive($campaignSlug: Int!, $active: Boolean!) {\n    updateCampaign(cmp: { id: $campaignSlug, active: $active }) {\n      id\n      active\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CampaignDetail($campaignSlug: Int!) {\n    campaign(campgainId: $campaignSlug) {\n      id\n      name\n      description\n      active\n      author {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query CampaignDetail($campaignSlug: Int!) {\n    campaign(campgainId: $campaignSlug) {\n      id\n      name\n      description\n      active\n      author {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeStreamActive($streamSlug: Int!, $campaignSlug: Int!, $active: Boolean!) {\n    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active }) {\n      id\n      active\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeStreamActive($streamSlug: Int!, $campaignSlug: Int!, $active: Boolean!) {\n    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active }) {\n      id\n      active\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateStream($streamSlug: Int!, $campaignSlug: Int!, $name: String, $active: Boolean) {\n    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active, name: $name }) {\n      id\n      active\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStream($streamSlug: Int!, $campaignSlug: Int!, $name: String, $active: Boolean) {\n    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active, name: $name }) {\n      id\n      active\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query StreamDetail($streamSlug: Int!) {\n    stream(streamId: $streamSlug) {\n      id\n      name\n      active\n      weight\n    }\n  }\n"): (typeof documents)["\n  query StreamDetail($streamSlug: Int!) {\n    stream(streamId: $streamSlug) {\n      id\n      name\n      active\n      weight\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery FragmentDocument($fragmentSlug: Int!) {\n    fragment(fragmentIds: [$fragmentSlug]) {\n        id\n        name\n        document\n    }\n}\n"): (typeof documents)["\nquery FragmentDocument($fragmentSlug: Int!) {\n    fragment(fragmentIds: [$fragmentSlug]) {\n        id\n        name\n        document\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateFragmentDocument($fragmentSlug: Int!, $name: String, $document: JSON) {\n    updateFragment(fg: {id: $fragmentSlug, name: $name, document: $document}) {\n        id\n        name\n        document\n    }\n}\n"): (typeof documents)["\nmutation UpdateFragmentDocument($fragmentSlug: Int!, $name: String, $document: JSON) {\n    updateFragment(fg: {id: $fragmentSlug, name: $name, document: $document}) {\n        id\n        name\n        document\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Project($projectSlug: Int!) {\n    project(projectId: $projectSlug) {\n      id\n      name\n      rootDirectory {\n        id\n        hasSubdirectories\n      }\n    }\n  }\n"): (typeof documents)["\n  query Project($projectSlug: Int!) {\n    project(projectId: $projectSlug) {\n      id\n      name\n      rootDirectory {\n        id\n        hasSubdirectories\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProjectDirectory($projectSlug: Int!, $name: String!, $parentId: Int!) {\n    createDirectory(directory: { projectId: $projectSlug, name: $name, parentId: $parentId }) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProjectDirectory($projectSlug: Int!, $name: String!, $parentId: Int!) {\n    createDirectory(directory: { projectId: $projectSlug, name: $name, parentId: $parentId }) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProjectFragment($projectSlug: Int!, $name: String!, $parentId: Int!) {\n    createFragment(fg: { name: $name, projectId: $projectSlug, document: \"{}\", directoryId: $parentId }) {\n      id\n      name\n      directoryId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProjectFragment($projectSlug: Int!, $name: String!, $parentId: Int!) {\n    createFragment(fg: { name: $name, projectId: $projectSlug, document: \"{}\", directoryId: $parentId }) {\n      id\n      name\n      directoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProjectDirectory($directoryId: Int!) {\n    deleteDirectory(directoryId: $directoryId)\n  }\n"): (typeof documents)["\n  mutation DeleteProjectDirectory($directoryId: Int!) {\n    deleteDirectory(directoryId: $directoryId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProjectFragment($fragmentId: Int!) {\n    deleteFragment(fragmentId: $fragmentId)\n  }\n"): (typeof documents)["\n  mutation DeleteProjectFragment($fragmentId: Int!) {\n    deleteFragment(fragmentId: $fragmentId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Directory on ProjectDirectoryGet {\n    id\n    parentId\n    name\n    hasSubdirectories\n    directories {\n      id\n      parentId\n      name\n      hasSubdirectories\n    }\n    fragments {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment Directory on ProjectDirectoryGet {\n    id\n    parentId\n    name\n    hasSubdirectories\n    directories {\n      id\n      parentId\n      name\n      hasSubdirectories\n    }\n    fragments {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProjectDirectory($directoryId: Int!) {\n    directory(directoryId: $directoryId) {\n      id\n      parentId\n      name\n      hasSubdirectories\n      directories {\n        id\n        parentId\n        name\n        hasSubdirectories\n      }\n      fragments {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProjectDirectory($directoryId: Int!) {\n    directory(directoryId: $directoryId) {\n      id\n      parentId\n      name\n      hasSubdirectories\n      directories {\n        id\n        parentId\n        name\n        hasSubdirectories\n      }\n      fragments {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProjectDirectory($directoryId: Int!, $name: String) {\n    updateDirectory(directory: { id: $directoryId, name: $name }) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProjectDirectory($directoryId: Int!, $name: String) {\n    updateDirectory(directory: { id: $directoryId, name: $name }) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProjectFragment($fragmentId: Int!, $name: String) {\n    updateFragment(fg: { id: $fragmentId, name: $name }) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProjectFragment($fragmentId: Int!, $name: String) {\n    updateFragment(fg: { id: $fragmentId, name: $name }) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthSignIn($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthSignIn($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CurrentProfile {\n    profile {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  query CurrentProfile {\n    profile {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AuthLogin($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        accessToken\n        refreshToken\n      }\n    }\n"): (typeof documents)["\n    mutation AuthLogin($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        accessToken\n        refreshToken\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthSignUp ($email: String!, $password: String!, $firstName: String!, $lastName: String) {\n    signup (email: $email, password: $password, firstName: $firstName, lastName: $lastName) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthSignUp ($email: String!, $password: String!, $firstName: String!, $lastName: String) {\n    signup (email: $email, password: $password, firstName: $firstName, lastName: $lastName) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListSteams($campaignSlug: Int!) {\n    stream(campaignId: $campaignSlug) {\n      id\n      weight\n      name\n      active\n    }\n  }\n"): (typeof documents)["\n  query ListSteams($campaignSlug: Int!) {\n    stream(campaignId: $campaignSlug) {\n      id\n      weight\n      name\n      active\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CampaignsList($projectId: Int!) {\n    campaign(projectId: $projectId) {\n      id\n      name\n      active\n      description\n    }\n  }\n"): (typeof documents)["\n  query CampaignsList($projectId: Int!) {\n    campaign(projectId: $projectId) {\n      id\n      name\n      active\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {\n    createCampaign(\n      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }\n    ) {\n      active\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {\n    createCampaign(\n      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }\n    ) {\n      active\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FragmentsNames($projectSlug: Int!, $fragmentIds: [Int!]) {\n    fragment(projectId: $projectSlug, fragmentIds: $fragmentIds) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query FragmentsNames($projectSlug: Int!, $fragmentIds: [Int!]) {\n    fragment(projectId: $projectSlug, fragmentIds: $fragmentIds) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject($name: String!) {\n    createProject(pr: { name: $name }) {\n      name\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($name: String!) {\n    createProject(pr: { name: $name }) {\n      name\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProjectsList {\n    project {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query ProjectsList {\n    project {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;