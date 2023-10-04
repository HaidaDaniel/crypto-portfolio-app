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
