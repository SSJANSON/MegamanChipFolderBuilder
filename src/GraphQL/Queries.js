import {gql} from '@apollo/client'

export const LOAD_CHIPS = gql`
    query{
        getAllChips {
            id
            name
            image
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
                name
                image
            }
        }
    }
`