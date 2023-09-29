/** @format */

import Paper from '@mui/material/Paper'
import {
  SortingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import { useEffect, useState } from 'react'

import { fetchCryptoData } from './api'
import './App.css'

const columns = [
  {
    name: 'rank',
    title: 'rank',
  },
  {
    name: 'id',
    title: 'ID',
  },
  {
    name: 'name',
    title: 'Name',
  },
  {
    name: 'marketCapUsd',
    title: 'marketCapUsd',
  },
  {
    name: 'priceUsd',
    title: 'priceUsd',
  },
  {
    name: 'volumeUsd24Hr',
    title: 'volumeUsd/24Hr',
  },
]

function App() {
  const [tableColumnExtensions] = useState([
    { columnName: 'rank', width: '8%' },
    { columnName: 'id', width: '11%' },
    { columnName: 'name', width: '11%' },
    { columnName: 'marketCapUsd', width: '15%' },
    { columnName: 'priceUsd', width: '10%' },
    { columnName: 'volumeUsd24Hr', width: '15%' },
  ]);
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
          <SortingState
            defaultSorting={[{ columnName: 'rank', direction: 'asc' }]}
          />
          <PagingState
            defaultCurrentPage={0}
            pageSize={5}
          />
          <IntegratedPaging />
          <IntegratedSorting />
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow showSortingControls />
          <PagingPanel />
        </Grid>
      )}
    </Paper>
  )
}

export default App
