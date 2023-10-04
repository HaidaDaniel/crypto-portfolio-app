import { gql } from '@apollo/client'

export const ALL_FAVORITES = gql`
query AllFavorites{
    allFavorites{
       id,
     name
     }
   }
`
