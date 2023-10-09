/** @format */
import { useState } from 'react'
import { Paper, CircularProgress } from '@mui/material'
import {
  SortingState,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  IntegratedSorting,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import { useMutation, useQuery } from '@apollo/client'

import { TableRow } from './index'

import {
  ColumnExtensionsState,
  columns,
  cellStyles,
  SortingColumnExtensionsState,
} from './gridProperties/mainGrid'
import {
  ADD_FAVORITE,
  ALL_FAVORITES,
  REMOVE_FAVORITE,
  ALL_CRYPTOS,
} from '../apollo/index'

const MainTable = () => {
  const { loading, error, data: cryptos } = useQuery(ALL_CRYPTOS)
  const { data: favorites } = useQuery(ALL_FAVORITES)
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    refetchQueries: [{ query: ALL_FAVORITES }],
  })
  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [{ query: ALL_FAVORITES }],
  })
  const [tableColumnExtensions] = useState(ColumnExtensionsState)
  const [SortingColumnExtensions] = useState(SortingColumnExtensionsState)
  const rawData = cryptos?.allCryptos
  const arrayFavs = favorites?.allFavorites
  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value)
  const roundToNDecimalPlaces = (value, n) => {
    if (isNumber(value)) {
      return parseFloat(value).toFixed(n)
    }
    return value
  }
  const filteredAndRoundedData = rawData?.map((crypto) => {
    return {
      ...crypto,
      marketCapUsd: parseInt(roundToNDecimalPlaces(crypto.marketCapUsd, 0)),
      volumeUsd24Hr: parseInt(roundToNDecimalPlaces(crypto.volumeUsd24Hr, 0)),
      priceUsd: parseFloat(roundToNDecimalPlaces(crypto.priceUsd, 8)),
      vwap24Hr: parseInt(roundToNDecimalPlaces(crypto.vwap24Hr, 0)),
      id: parseInt(crypto.id),
    }
  })
  const toggleFavorite = async (crypto_id) => {
    try {
      if (arrayFavs?.some((fav) => parseInt(fav.crypto_id) === crypto_id)) {
        const favId = arrayFavs?.find(
          (obj) => obj.crypto_id === crypto_id.toString()
        ).id
        await removeFavorite({ variables: { id: favId } })
        console.log(`Removed to favorites: ${crypto_id}`)
      } else {
        await addFavorite({
          variables: {
            crypto_id: crypto_id,
          },
        })
        console.log(`Added to favorites: ${crypto_id}`)
      }
    } catch (error) {
      console.error('Error adding to favorites:', error)
    }
  }

  return (
    <Paper>
      {loading && <CircularProgress />}
      {error && <div>Error in download data</div>}
      {!loading && (
        <Grid rows={filteredAndRoundedData} columns={columns}>
          <SortingState
            defaultSorting={[{ columnName: 'rank', direction: 'asc' }]}
            columnExtensions={SortingColumnExtensions}
          />
          <IntegratedSorting />
          <PagingState defaultCurrentPage={0} pageSize={20} />
          <SearchState defaultValue='' />
          <IntegratedFiltering />
          <IntegratedPaging />
          <Table
            columnExtensions={tableColumnExtensions}
            rowComponent={({ row }) => (
              <TableRow
                row={row}
                columns={columns}
                cellStyles={cellStyles}
                onToggleAction={toggleFavorite}
                isActionVisible={true}
                actionLabel={
                  arrayFavs?.some((fav) => parseInt(fav.crypto_id) === row.id)
                    ? 'Remove from Fav'
                    : 'Add to Fav'
                }
              />
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

export default MainTable
