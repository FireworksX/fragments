import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
export type FolderTreeItemFragment = { __typename?: 'ProjectDirectoryGet', name: string, parentId?: number | null, hasSubdirectories: boolean, hasFragments: boolean };

export const FolderTreeItemFragmentDoc = gql`
    fragment FolderTreeItem on ProjectDirectoryGet {
  name
  parentId
  hasSubdirectories
  hasFragments
}
    `;