import { gql } from '@apollo/client';

export const NoteModelsGetAll = gql`
  {
    EndUsersNoteModelsGetAll {
      _id
      name
      fields {
        id
        name
        type

        enumValues {
          id
          value
        }
      }

      createdAt
      updatedAt
    }
  }
`;
