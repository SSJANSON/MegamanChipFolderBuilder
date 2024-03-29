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
            ver
        }
    }
`

export const LOAD_FOLDERS = gql`
    query{
        getAllFolders {
            id
            name
            counter{
                name
                count
                category
            }
            chips{
                id
                chip_id
                name
                letter
            }
        }
    }
`