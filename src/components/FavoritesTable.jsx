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

import { ALL_FAVORITES, REMOVE_FAVORITE } from "../apollo/favorites";
import AddRemovePortfolio from "./AddRemovePortfolio";
import { GET_CRYPTOS_BY_IDS } from "../apollo/cryptos";

const FavoriteTable = () => {
    const { data: favorites } = useQuery(ALL_FAVORITES)
    const arrayFavs = favorites?.allFavorites
    const cryptoIds = arrayFavs.map((crypto) => parseInt(crypto.crypto_id));
    const { loading, error, data: cryptos } = useQuery(GET_CRYPTOS_BY_IDS, {
        variables: { ids: cryptoIds },
    });
    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [
            { query: ALL_FAVORITES }
        ]
    });
    const [tableColumnExtensions] = useState(ColumnExtensionsState);
    const [SortingColumnExtensions] = useState(SortingColumnExtensionsState);
    const rawData = cryptos?.allCryptos;
    console.log(arrayFavs)
    const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    const roundToNDecimalPlaces = (value, n) => {
        if (isNumber(value)) {
            return parseFloat(value).toFixed(n);
        }
        return value;
    }
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
    const toggleFavorite = async (id) => {
        try {
            const favid = arrayFavs.filter((obj) => obj.crypto_id === id.toString())[0]['id']
            await removeFavorite({ variables: { id: favid } });
            console.log(`Removed from favorites: ${favid.toString()}`);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };
    // const togglePortfolio = async (name) => {
    //     try {
    //         if (arrayPorts.some((item) => item.name === name)) {
    //             const removedId = parseInt(arrayPorts.find((item) => item.name === name).id)
    //             await removePortfolio({ variables: { id: removedId } });
    //             console.log(`Removed to favorites: ${name}`);
    //         }
    //         else {
    //             await addPortfolio({ variables: { name } });
    //             console.log(`Added to favorites: ${name}`);
    //         }
    //         console.log(arrayPorts)

    //     } catch (error) {
    //         console.error("Error adding to portfolio:", error);
    //     }
    // };

    const TableRow = ({ row, onToggleFavorite }) => (
        <Table.Row>
            {columns?.map((column) => (
                <Table.Cell key={column.name} style={cellStyles(column.name)} >
                    {column.name === 'sname' ? (
                        <Button
                            onClick={() => onToggleFavorite(row.id)}
                            variant="outlined"
                            color="primary"
                        >
                            {'Remove from Fav'}
                        </Button>
                    ) : column.name === 'priceUsd' || column.name === 'marketCapUsd' || column.name === 'volumeUsd24Hr' ? (
                        `${row[column.name]} $`
                    ) : column.name === 'p' ? (<AddRemovePortfolio
                        isFavorite={arrayFavs?.some((item) => item.name === row.name)}
                    // onTogglePortfolio={(amount) => togglePortfolio(row.name, amount)}
                    >
                        {arrayFavs?.some((item) => item.name === row.name) ? 'Remove from Fav' : 'Add to Fav'}
                    </AddRemovePortfolio>) : (
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