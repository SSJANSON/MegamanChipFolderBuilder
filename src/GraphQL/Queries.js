import {gql} from '@apollo/client'

export const LOAD_CHIPS = gql`
    query{
        getAllChips {
            chip_id
            name
            type
            damage
            description
            letter
            category
            mb
            location
        }
    }
`

export const LOAD_FOLDERS = gql`
    query{
        getAllFolders {
            id
            name
            chips{
                id
                chip_id
                name
                letter
            }
        }
    }
`