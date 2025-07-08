import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
export type FragmentTreeItemFragment = { __typename?: 'FragmentGet', name: string };

export const FragmentTreeItemFragmentDoc = gql`
    fragment FragmentTreeItem on FragmentGet {
  name
}
    `;
