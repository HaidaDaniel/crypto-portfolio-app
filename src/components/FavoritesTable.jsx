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
import { ADD_PORTFOLIO, ALL_PORTFOLIOS, REMOVE_PORTFOLIO } from "../apollo/portfolio";

const FavoriteTable = () => {
    const { data: favorites } = useQuery(ALL_FAVORITES)
    const { data: portfolios } = useQuery(ALL_PORTFOLIOS)
    const arrayFavs = favorites?.allFavorites
    const arrayPorts = portfolios?.allPortfolios
    const cryptoIds = arrayFavs.map((crypto) => parseInt(crypto.crypto_id));
    const { loading, error, data: cryptos } = useQuery(GET_CRYPTOS_BY_IDS, {
        variables: { ids: cryptoIds },
    });
    const [addPortfolio] = useMutation(ADD_PORTFOLIO, {
        refetchQueries: [
            { query: ALL_PORTFOLIOS }
        ]
    });
    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [
            { query: ALL_FAVORITES }
        ]
    });
    const [removePortfolio] = useMutation(REMOVE_PORTFOLIO, {
        refetchQueries: [
            { query: ALL_PORTFOLIOS }
        ]
    });
    const [tableColumnExtensions] = useState(ColumnExtensionsState);
    const [SortingColumnExtensions] = useState(SortingColumnExtensionsState);
    const rawData = cryptos?.allCryptos;
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
            const favid = arrayFavs.find((obj) => obj.crypto_id === id.toString())['id']
            await removeFavorite({ variables: { id: favid } });
            console.log(`Removed from favorites: ${favid.toString()}`);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };
    const togglePortfolio = async (id, amount) => {
        try {
            if (arrayPorts?.some((item) => parseInt(item.crypto_id) === id)) {
                const removedId = arrayPorts?.find((obj) => obj.crypto_id === id.toString()).id
                await removePortfolio({ variables: { id: removedId } });
                console.log(`Removed to Portfolio: ${id}`);
            }
            else {
                await addPortfolio({ variables: { crypto_id: id, amount: parseFloat(amount) } });
                console.log(`Added to Portfolio: ${id}`);
            }
            console.log(arrayPorts)

        } catch (error) {
            console.error("Error adding to portfolio:", error);
        }
    };

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
                        isInPortfolio={arrayPorts?.some((item) => item.name === row.name)}
                        onTogglePortfolio={(amount) => togglePortfolio(row.id, amount)}
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
            {error && <div>Error in downloading data</div>}
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
                            <TableRow row={row} onToggleFavorite={toggleFavorite} onTogglePortfolio={togglePortfolio} />
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