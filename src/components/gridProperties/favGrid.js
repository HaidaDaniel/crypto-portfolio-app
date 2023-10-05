export const columns = [
    {
        name: 'id',
        title: 'Rank',
    },
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
        name: 'sname',
        title: 'Add to fav',
    },
    {
        name: 'p',
        title: 'Add to portfolio',
    },
]

export const ColumnExtensionsState = [
    { columnName: 'name', width: '15%', align: 'center' },
    { columnName: 'priceUsd', width: '20%', align: 'right' },
    { columnName: 'volumeUsd24Hr', width: '15%', align: 'right' },
    { columnName: 'sname', width: '19%', align: 'center' },
    { columnName: 'p', width: '25%', align: 'center' },

]
export const cellStyles = (name) => {
    switch (name) {
        case 'name':
            return { textAlign: 'center' }
        case 'sname':
            return { textAlign: 'center' }
        case 'p':
            return { textAlign: 'center' }
        default: return { textAlign: 'right' }
    }
}
export const SortingColumnExtensionsState = [
    { columnName: 'sname', sortingEnabled: false },
    { columnName: 'p', sortingEnabled: false },
]
