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
        name: 'fav',
        title: 'Add to fav',
    },
    {
        name: 'p',
        title: 'Add to portfolio',
    },
]

export const ColumnExtensionsState = [
    { columnName: 'name', width: '15%', align: 'center' },
    { columnName: 'priceUsd', width: '19%', align: 'right' },
    { columnName: 'volumeUsd24Hr', width: '15%', align: 'right' },
    { columnName: 'fav', width: '20%', align: 'center' },
    { columnName: 'p', width: '31%', align: 'center' },

]

export const cellStyles = (name) => {
    switch (name) {
        case 'name':
            return { textAlign: 'center' }
        case 'fav':
            return { textAlign: 'center' }
        case 'p':
            return { textAlign: 'center' }
        default: return { textAlign: 'right' }
    }
}

export const SortingColumnExtensionsState = [
    { columnName: 'fav', sortingEnabled: false },
    { columnName: 'p', sortingEnabled: false },
]
