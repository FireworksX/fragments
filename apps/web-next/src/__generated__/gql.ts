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
    "\n  mutation AuthSignIn($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthSignInDocument,
    "\n  query CurrentProfile {\n    profile {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.CurrentProfileDocument,
    "\n    mutation AuthLogin($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        accessToken\n        refreshToken\n      }\n    }\n": types.AuthLoginDocument,
    "\n  mutation AuthSignUp ($email: String!, $password: String!, $firstName: String!, $lastName: String) {\n    signup (email: $email, password: $password, firstName: $firstName, lastName: $lastName) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthSignUpDocument,
    "\n  query CampaignsList($projectId: Int!) {\n    campaign(projectId: $projectId) {\n      id\n      name\n      active\n      description\n    }\n  }\n": types.CampaignsListDocument,
    "\n  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {\n    createCampaign(\n      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }\n    ) {\n      active\n      name\n      description\n    }\n  }\n": types.CreateCampaignDocument,
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
export function gql(source: "\n  query CampaignsList($projectId: Int!) {\n    campaign(projectId: $projectId) {\n      id\n      name\n      active\n      description\n    }\n  }\n"): (typeof documents)["\n  query CampaignsList($projectId: Int!) {\n    campaign(projectId: $projectId) {\n      id\n      name\n      active\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {\n    createCampaign(\n      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }\n    ) {\n      active\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {\n    createCampaign(\n      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }\n    ) {\n      active\n      name\n      description\n    }\n  }\n"];
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