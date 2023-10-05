import { gql } from '@apollo/client'

export const ALL_FAVORITES = gql`
query AllFavorites{
    allFavorites{
      crypto_id,
      id
     }
   }
`
export const ADD_FAVORITE = gql`
mutation AddFavorite($crypto_id:ID!){
 createFavorite(crypto_id:$crypto_id){
  crypto_id
}
}
`
export const REMOVE_FAVORITE = gql`
mutation removeFavorite($id:ID!){
 removeFavorite( id:$id){
  id
}
}
`