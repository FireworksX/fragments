import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadAssetMutationVariables = Types.Exact<{
  type: Types.MediaType;
  targetId: Types.Scalars['Int']['input'];
  file: Types.Scalars['Upload']['input'];
}>;


export type UploadAssetMutation = { __typename?: 'Mutation', uploadAsset: { __typename?: 'MediaGet', url: string } };


export const UploadAssetDocument = gql`
    mutation UploadAsset($type: MediaType!, $targetId: Int!, $file: Upload!) {
  uploadAsset(media: {mediaType: $type, targetId: $targetId}, file: $file) {
    url: publicPath
  }
}
    `;
export type UploadAssetMutationFn = Apollo.MutationFunction<UploadAssetMutation, UploadAssetMutationVariables>;

/**
 * __useUploadAssetMutation__
 *
 * To run a mutation, you first call `useUploadAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAssetMutation, { data, loading, error }] = useUploadAssetMutation({
 *   variables: {
 *      type: // value for 'type'
 *      targetId: // value for 'targetId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadAssetMutation(baseOptions?: Apollo.MutationHookOptions<UploadAssetMutation, UploadAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAssetMutation, UploadAssetMutationVariables>(UploadAssetDocument, options);
      }
export type UploadAssetMutationHookResult = ReturnType<typeof useUploadAssetMutation>;
export type UploadAssetMutationResult = Apollo.MutationResult<UploadAssetMutation>;
export type UploadAssetMutationOptions = Apollo.BaseMutationOptions<UploadAssetMutation, UploadAssetMutationVariables>;