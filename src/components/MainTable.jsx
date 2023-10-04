import { useState, useEffect } from "react";
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

import { ColumnExtensionsState, columns, cellStyles, SortingColumnExtensionsState } from "./gridProperties/mainGrid";
import { fetchCryptoData } from "../api";

const MainTable = () => {
    const [favorites, setFavorites] = useState([]);
    const [tableColumnExtensions] = useState(ColumnExtensionsState);
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [SortingColumnExtensions] = useState(SortingColumnExtensionsState);

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
                <Table.Cell key={column.name} style={cellStyles(column.name)} >
                    {column.name === 'id' ? (
                        <Button
                            onClick={() => onToggleFavorite(row.id)}
                            variant="outlined"
                            color="primary"
                        >
                            {favorites.includes(row.id) ? 'Remove from Fav' : 'Add to Fav'}
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
            {isLoading && <>Loading...</>}
            {!isLoading && (
                <Grid rows={rows} columns={columns}>
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

export default MainTable;