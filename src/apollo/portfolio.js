import { gql } from '@apollo/client'

export const ALL_PORTFOLIOS = gql`
query AllPortfolios{
    allPortfolios{
      crypto_id,
      amount,id
     }
   }
`
export const ADD_PORTFOLIO = gql`
mutation AddPortfolio($crypto_id: ID! ,$amount: Float!){
 createPortfolio(crypto_id:$crypto_id,amount:$amount){
  crypto_id,
  amount
}
}
`
export const REMOVE_PORTFOLIO = gql`
mutation removePortfolio($id:ID!){
 removePortfolio( id:$id){
  id
}
}
`
export const UPDATE_PORTFOLIO = gql`
mutation updatePortfolio($id:ID!, ,$amount: Float!){
  updatePortfolio(id:$id,amount:$amount){
   id,
   amount
 }
 }`