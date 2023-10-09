export const columns = [
    {
        name: 'name',
        title: 'Name',
    },
    {
        name: 'priceUsd',
        title: 'Price',
    },
    {
        name: 'volumeUsd24Hr',
        title: 'Volume /24Hr',
    },
    {
        name: 'p',
        title: 'Add to Amount',
    },
    {
        name: 'amount',
        title: 'Amount',
    },
]

export const ColumnExtensionsState = [
    { columnName: 'name', width: '15%', align: 'center' },
    { columnName: 'priceUsd', width: '20%', align: 'right' },
    { columnName: 'volumeUsd24Hr', width: '15%', align: 'right' },
    { columnName: 'p', width: '30%', align: 'center' },
    { columnName: 'amount', width: '20%', align: 'center' },

]

export const cellStyles = (name) => {
    switch (name) {
        case 'name':
            return { textAlign: 'center' }

        case 'p':
            return { textAlign: 'center' }
        case 'amount':
            return { textAlign: 'center' }
        default: return { textAlign: 'right' }
    }
}

export const SortingColumnExtensionsState = [
    { columnName: 'p', sortingEnabled: false },
]
