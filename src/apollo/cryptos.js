import { gql } from '@apollo/client'

export const ALL_CRYPTOS = gql`
query AllCryptos{
    allCryptos{
       id,
     name,
     sname,
     priceUsd,
     volumeUsd24Hr,
     marketCapUsd,
     }
   }
`
export const GET_CRYPTOS_BY_IDS = gql`
query GetCryptosByIds($ids: [ID!]!) {
  allCryptos(filter: { ids: $ids }) {
    id,
    name,
    sname,
    priceUsd,
    volumeUsd24Hr,
    marketCapUsd,
  }
}
`
export const GET_CRYPTOS_BY_ID = gql`
query GetCryptosById($id: ID!) {
  Crypto( id: $id ) {
    id,
    name,
    sname,
    priceUsd,
    volumeUsd24Hr,
    marketCapUsd,
    vwap24Hr,
    explorer,
    changePercent24Hr,
    supply,
    maxSupply,
  }
}
`

