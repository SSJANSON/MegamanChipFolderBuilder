import {gql} from "@apollo/client"

export const ADD_CHIP = gql`

    mutation addChip(
        $folder_id: Int!
        $chip_id: Int! 
        $name: String! 
        $letter: String!
        $mb: Int! 
        $category: String!
    ) {
    addChip(
        folder_id: $folder_id
        chip_id: $chip_id
        name: $name
        letter: $letter
        mb: $mb
        category: $category
        ) {
            id
            name
            letter
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

export const DELETE_CHIP = gql`
    mutation deleteChip(
        $folder_id: Int!
        $chip_id: Int!
        $id: Int!
        $name: String!
    ){
        deleteChip(
            folder_id: $folder_id
            chip_id: $chip_id
            id: $id
            name: $name
        ){
            id
        }
    }
`