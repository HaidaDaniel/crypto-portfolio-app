import { useState } from "react";
import Paper from '@mui/material/Paper'
import {
    SortingState,
    PagingState,
    IntegratedPaging,
    SearchState,
    IntegratedFiltering,
    IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery } from '@apollo/client'

import { ColumnExtensionsState, columns, cellStyles, SortingColumnExtensionsState } from "./gridProperties/favGrid";

import { ADD_FAVORITE, ALL_FAVORITES, ALL_FAVORITES_DATA, REMOVE_FAVORITE } from "../apollo/favorites";

const FavoriteTable = () => {
    const { loading, error, data: cryptos } = useQuery(ALL_FAVORITES_DATA)
    const { loadingFav, data: favorites } = useQuery(ALL_FAVORITES)
    const [addFavorite] = useMutation(ADD_FAVORITE, {
        refetchQueries: [
            { query: ALL_FAVORITES }
        ]
        // update(cache, { data: { newFav } }) {
        //     const { favorites } = cache.readQuery({ query: ALL_FAVORITES })
        //     cache.writeQuery({
        //         query: ALL_FAVORITES,
        //         data: {
        //             fovorites: [newFav, ...favorites]
        //         }
        //     })
        // }
    });
    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [
            { query: ALL_FAVORITES }
        ]
    });
    const [tableColumnExtensions] = useState(ColumnExtensionsState);
    const [SortingColumnExtensions] = useState(SortingColumnExtensionsState);
    const rawData = cryptos?.allFavorites;
    const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    const roundToNDecimalPlaces = (value, n) => {
        if (isNumber(value)) {
            return parseFloat(value).toFixed(n);
        }
        return value;
    }
    const arrayFavs = favorites?.allFavorites
    const filteredAndRoundedData = rawData?.map((crypto) => {
        return {
            ...crypto,
            marketCapUsd: parseInt(roundToNDecimalPlaces(crypto.marketCapUsd, 0)),
            volumeUsd24Hr: parseInt(roundToNDecimalPlaces(crypto.volumeUsd24Hr, 0)),
            priceUsd: parseFloat(roundToNDecimalPlaces(crypto.priceUsd, 10)),
            vwap24Hr: parseInt(roundToNDecimalPlaces(crypto.vwap24Hr, 0)),
            id: parseInt(crypto.id),
        };
    });
    const toggleFavorite = async (name) => {
        try {
            if (arrayFavs.some((item) => item.name === name)) {
                const removedId = parseInt(arrayFavs.find((item) => item.name === name).id)
                await removeFavorite({ variables: { id: removedId } });
                console.log(`Removed to favorites: ${name}`);
                console.log(arrayFavs)
            }
            else {
                await addFavorite({ variables: { name } });
                console.log(`Added to favorites: ${name}`);
            }

        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    const TableRow = ({ row, onToggleFavorite }) => (
        <Table.Row>
            {columns?.map((column) => (
                <Table.Cell key={column.name} style={cellStyles(column.name)} >
                    {column.name === 'sname' ? (
                        <Button
                            onClick={() => onToggleFavorite(row.name)}
                            variant="outlined"
                            color="primary"
                        >
                            {arrayFavs?.some((item) => item.name === row.name) ? 'Remove from Fav' : 'Add to Fav'}
                        </Button>
                    ) : column.name === 'priceUsd' || column.name === 'marketCapUsd' || column.name === 'volumeUsd24Hr' ? (
                        `${row[column.name]} $`
                    ) : (
                        row[column.name]
                    )}
                </Table.Cell>
            ))}
        </Table.Row>)

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
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={20}
                    />
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <IntegratedPaging />
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
        </Paper>)
}

export default FavoriteTable;