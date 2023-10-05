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
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQuery } from '@apollo/client'

import { ColumnExtensionsState, columns, cellStyles, SortingColumnExtensionsState } from "./gridProperties/portfolioGrid";
import AddRemovePortfolio from "./AddRemovePortfolio";
import { GET_CRYPTOS_BY_IDS } from "../apollo/cryptos";
import { ADD_PORTFOLIO, ALL_PORTFOLIOS, REMOVE_PORTFOLIO } from "../apollo/portfolio";

const PortfolioTable = () => {

    const { data: portfolios } = useQuery(ALL_PORTFOLIOS)
    const arrayPorts = portfolios?.allPortfolios
    const cryptoIds = arrayPorts?.map((crypto) => parseInt(crypto.crypto_id));
    const { loading, error, data: cryptos } = useQuery(GET_CRYPTOS_BY_IDS, {
        variables: { ids: cryptoIds },
    });
    const [addPortfolio] = useMutation(ADD_PORTFOLIO, {
        refetchQueries: [
            { query: ALL_PORTFOLIOS }
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
        const amount = arrayPorts?.find((port) => port.crypto_id.toString() === crypto.id).amount || 0;
        return {
            name: crypto.name,
            volumeUsd24Hr: parseInt(roundToNDecimalPlaces(crypto.volumeUsd24Hr, 0)),
            priceUsd: parseFloat(roundToNDecimalPlaces(crypto.priceUsd, 10)),
            id: parseInt(crypto.id),
            amount: amount
        };
    });
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

        } catch (error) {
            console.error("Error adding to portfolio:", error);
        }
    };
    const TableRow = ({ row }) => (
        <Table.Row>
            {columns?.map((column) => (
                <Table.Cell key={column.name} style={cellStyles(column.name)} >
                    {column.name === 'priceUsd' || column.name === 'marketCapUsd' || column.name === 'volumeUsd24Hr' ? (
                        `${row[column.name]} $`
                    ) : column.name === 'p' ? (<AddRemovePortfolio
                        isInPortfolio={arrayPorts?.some((item) => item.name === row.name)}
                        onTogglePortfolio={(amount) => togglePortfolio(row.id, amount)}
                    >
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
                            <TableRow row={row} onTogglePortfolio={togglePortfolio} />
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
export default PortfolioTable