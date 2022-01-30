import { gql } from '@apollo/client';

export const CreateNoteModel = gql`
  mutation ($input: EndUsersNoteModelsCreateInput!) {
    EndUsersNoteModelsCreate(input: $input)
  }
`;
