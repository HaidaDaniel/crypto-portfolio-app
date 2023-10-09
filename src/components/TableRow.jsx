/** @format */

import React from 'react'
import { Button } from '@mui/material'
import { Table } from '@devexpress/dx-react-grid-material-ui'

import AddRemovePortfolio from './AddRemovePortfolio'
import ChangePortfolioAmount from './ChangePortfolioAmount'

const TableRow = ({
    row,
    onToggleAction,
    onToggleActionPortfolio,
    actionLabel,
    isActionVisible,
    cellStyles,
    columns,
    favoritesRow,
    isInPortfolio,
}) => (
    <Table.Row>
        {columns.map((column) => (
            <Table.Cell key={column.name} style={cellStyles(column.name)}>
                {column.name === 'sname' && isActionVisible ? (
                    <Button
                        onClick={() => onToggleAction(row.id)}
                        variant='outlined'
                        color='primary'>
                        {actionLabel}
                    </Button>
                ) : column.name === 'priceUsd' ||
                    column.name === 'marketCapUsd' ||
                    column.name === 'volumeUsd24Hr' ? (
                    `${row[column.name]} $`
                ) : column.name === 'p' ? (
                    (favoritesRow ? (
                        <AddRemovePortfolio
                            isInPortfolio={isInPortfolio}
                            onTogglePortfolio={(amount) =>
                                onToggleActionPortfolio(row.id, amount)
                            }
                        />
                    ) :
                        (
                            <ChangePortfolioAmount
                                initialValue={0}
                                onAdd={(amount) => onToggleActionPortfolio(row.id, +amount)}
                                onSubtract={(amount) => onToggleActionPortfolio(row.id, -amount)}
                                onDelete={() => onToggleActionPortfolio(row.id, 'del')}
                            />
                        ))
                ) : (
                    row[column.name]
                )}
            </Table.Cell>
        ))}
    </Table.Row>
)

export default TableRow
