import { gql } from '@apollo/client'

export const ALL_PORTFOLIO = gql`
query AllPortfolio{
    allPortfolio{
     name,
     priceUsd,
     amount
     }
   }
`
export const ADD_PORTFOLIO = gql`
mutation CreatePortfolio($name: String!, $priceUsd: String!, $amount: Float!) {
  createPortfolio(name: $name, priceUsd: $priceUsd, amount: $amount) {
    name
    priceUsd
    amount
  }
}`