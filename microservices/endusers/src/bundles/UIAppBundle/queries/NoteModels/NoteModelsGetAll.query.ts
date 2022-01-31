import { gql } from '@apollo/client';

export const NoteModelsGetAll = gql`
  {
    EndUsersNoteModelsGetAll {
      _id
      name
      fields {
        name
        type
        enumValues
      }

      createdAt
      updatedAt
    }
  }
`;
