import { gql } from '@apollo/client'

export const ALL_FAVORITES = gql`
query AllFavorites{
    allFavorites{
     name,id
     }
   }
`
export const ADD_FAVORITE = gql`
mutation AddFavorite($name:String!,$sname: String!,$marketCapUsd: String!,$volumeUsd24Hr: String!,$priceUsd: String!){
 createFavorite(name:$name,sname:$sname,priceUsd:$priceUsd,volumeUsd24Hr:$volumeUsd24Hr, marketCapUsd:$marketCapUsd){
     name,
     sname,
     priceUsd,
     volumeUsd24Hr,
     marketCapUsd,
}
}
`
export const REMOVE_FAVORITE = gql`
mutation removeFavorite($id:ID!){
 removeFavorite(id:$id){
    id,
}
}
`
export const ALL_FAVORITES_DATA = gql`
query AllFavorites{
  allFavorites{
    id
    name
    sname
    priceUsd
    volumeUsd24Hr
    marketCapUsd
  }
}`