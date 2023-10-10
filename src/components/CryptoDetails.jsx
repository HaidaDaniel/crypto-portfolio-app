/** @format */
import { useLocation } from 'react-router-dom'
import { Container, Typography, Link, Grid, Paper } from '@mui/material'
import { useQuery } from '@apollo/client'

import { CryptoPriceChart } from './index'

import { GET_CRYPTOS_BY_ID } from '../apollo'

const CryptoDetails = () => {
  let { state } = useLocation()
  const cryptoId = state.idOfCrypto

  const { data: cryptoData } = useQuery(GET_CRYPTOS_BY_ID, {
    variables: { id: cryptoId },
  })
  const crypto = cryptoData?.Crypto
  if (!crypto) {
    return <Typography variant='h4'>Crypto not found</Typography>
  }

  return (
    <Container>
      <Typography variant='h4'>{crypto.name}</Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <CryptoPriceChart cryptoId={crypto.sname} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Supply:</Typography>
            <Typography>{crypto.supply}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Max Supply:</Typography>
            <Typography>
              {crypto.maxSupply !== null ? crypto.maxSupply : '\u221E'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Market Cap (USD):</Typography>
            <Typography>${crypto.marketCapUsd}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>24Hr Volume (USD):</Typography>
            <Typography>${crypto.volumeUsd24Hr}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Price (USD):</Typography>
            <Typography>${crypto.priceUsd}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Change (24Hr):</Typography>
            <Typography>{crypto.changePercent24Hr}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>VWAP (24Hr):</Typography>
            <Typography>${crypto.vwap24Hr}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Explorer:</Typography>
            <Link
              href={crypto.explorer}
              target='_blank'
              rel='noopener noreferrer'>
              {crypto.explorer}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default CryptoDetails
