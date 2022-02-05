import { gql } from "@apollo/client";

export const UpdateNoteModels = gql`
    mutation($input: EndUsersNoteModelsUpdateInput!) {
        EndUsersNoteModelsUpdate(input: $input) {
            _id

            name

            createdAt

            fields {
                id

                name
                type

                enumValues {
                    id
                    value
                }
            }
        }
    }
`