import {gql} from "@apollo/client"

export const ADD_CHIP = gql`

    mutation addChip(
        $folder_id: Int!
        $id: Int! 
        $name: String! 
    ) {
    addChip(
        folder_id: $folder_id
        id: $id
        name: $name
        ) {
            id
            name
        }
    }
`

export const CREATE_FOLDER = gql`
    mutation createFolder(
        $name: String!
    ){
        createFolder(
            name: $name
        ){
            id
            name
        }
    }
`