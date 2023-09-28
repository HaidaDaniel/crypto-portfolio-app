/** @format */

import Paper from '@mui/material/Paper'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import { useEffect, useState } from 'react'

import { fetchCryptoData } from './api'
import './App.css'

const columns = [
  {
    name: 'rank',
    title: 'rank',
    width: '50px',
  },
  {
    name: 'id',
    title: 'ID',
    width: '100px',
  },
  {
    name: 'name',
    title: 'Name',
    width: '100px',
  },
  {
    name: 'marketCapUsd',
    title: 'marketCapUsd',
  },
  {
    name: 'priceUsd',
    title: 'priceUsd',
    width: '200px',
  },
  {
    name: 'volumeUsd24Hr',
    title: 'volumeUsd/24Hr',
  },
]

function App() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchCryptoData().then((data) => {
      setRows(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <Paper>
      {isLoading && <>Loading...</>}
      {!isLoading && (
        <Grid rows={rows} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      )}
    </Paper>
  )
}

export default App
