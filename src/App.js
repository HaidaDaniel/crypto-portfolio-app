/** @format */
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper'
import {
  SortingState,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
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
  const [favorites, setFavorites] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'rank', width: '8%' },
    { columnName: 'id', width: '15%' },
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
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {

      const updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
      setFavorites(updatedFavorites);
    } else {

      setFavorites([...favorites, id]);
    }
  };
  const TableRow = ({ row, onToggleFavorite }) => (
    <Table.Row>
      {columns.map((column) => (
        <Table.Cell key={column.name}>
          {column.name === 'id' ? (
            <Button
              onClick={() => onToggleFavorite(row.id)}
              variant="outlined"
              color="primary"
            >
              {favorites.includes(row.id) ? 'Remove from Fav' : 'Add to Fav'}
            </Button>
          ) : (
            row[column.name]
          )}
        </Table.Cell>
      ))}
    </Table.Row>
  );

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
            pageSize={20}
          />
          <IntegratedPaging />
          <SearchState defaultValue="" />
          <IntegratedFiltering />
          <IntegratedSorting />
          <Table columnExtensions={tableColumnExtensions}
            rowComponent={({ row }) => (
              <TableRow row={row} onToggleFavorite={toggleFavorite} />
            )} />

          <TableHeaderRow showSortingControls />
          <PagingPanel />
          <Toolbar />
          <SearchPanel />
        </Grid>
      )}
    </Paper>
  )
}

export default App
