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
import Header from './components/Header';

const columns = [
  {
    name: 'rank',
    title: 'rank',
  },
  {
    name: 'name',
    title: 'Name',
  },
  {
    name: 'priceUsd',
    title: 'priceUsd',
  },
  {
    name: 'volumeUsd24Hr',
    title: 'volumeUsd/24Hr',
  },
  {
    name: 'marketCapUsd',
    title: 'marketCapUsd',
  },
  {
    name: 'id',
    title: 'Add to fav',
  },
]

function App() {
  const [favorites, setFavorites] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'rank', width: '10%', align: 'left' },
    { columnName: 'name', width: '18%' },
    { columnName: 'priceUsd', width: '16%' },
    { columnName: 'marketCapUsd', width: '17%' },
    { columnName: 'volumeUsd24Hr', width: '18%' },
    { columnName: 'id', width: '15%', align: 'center' },

  ]);
  const priceCompare = (a, b) => {
    return Math.abs(a - b) <= 0.01
  };
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [integratedSortingColumnExtensions] = useState([
    { columnName: 'priceUsd', compare: priceCompare },
  ]);
  const [SortingColumnExtensions] = useState([
    { columnName: 'id', sortingEnabled: false },
  ]);

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
        <Table.Cell key={column.name} style={column.name === 'rank' ? { paddingLeft: '0px', paddingRight: '8px', paddingTop: '16px', paddingBottom: '16px', textAlign: 'center' } : {}}>
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
      <Header />
      {isLoading && <>Loading...</>}
      {!isLoading && (
        <Grid rows={rows} columns={columns}>
          <SortingState
            defaultSorting={[{ columnName: 'rank', direction: 'asc' }]}
            columnExtensions={SortingColumnExtensions}
          />
          <IntegratedSorting
            ColumnExtension={integratedSortingColumnExtensions} />
          <PagingState
            defaultCurrentPage={0}
            pageSize={200}
          />
          <IntegratedPaging />
          <SearchState defaultValue="" />
          <IntegratedFiltering />
          <Table columnExtensions={tableColumnExtensions}
            rowComponent={({ row }) => (
              <TableRow row={row} onToggleFavorite={toggleFavorite} />
            )}
          />
          <PagingPanel />
          <Toolbar />
          <SearchPanel />
          <TableHeaderRow showSortingControls />
        </Grid>
      )}
    </Paper>
  )
}

export default App


