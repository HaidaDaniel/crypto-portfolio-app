import { gql } from '@apollo/client'

export const ALL_CRYPTOS = gql`
query AllCryptos{
    allCryptos{
       id,
     name,
     rank,
     priceUsd,
     volumeUsd24Hr,
     marketCapUsd,
     }
   }
`
