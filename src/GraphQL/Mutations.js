import {gql} from "@apollo/client"

export const ADD_CHIP = gql`

    mutation addChip(
        $folder_id: Int!
        $chip_id: Int! 
        $name: String! 
    ) {
    addChip(
        folder_id: $folder_id
        chip_id: $chip_id
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

export const DELETE_CHIP = gql`
    mutation deleteChip(
        $folder_id: Int!
        $chip_id: Int!
        $id: Int!
    ){
        deleteChip(
            folder_id: $folder_id
            chip_id: $chip_id
            id: $id
        ){
            id
        }
    }
`