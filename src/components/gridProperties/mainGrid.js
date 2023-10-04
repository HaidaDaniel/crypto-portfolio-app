export const columns = [
    {
        name: 'rank',
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
        name: 'marketCapUsd',
        title: 'Market Capitalization',
    },
    {
        name: 'id',
        title: 'Add to fav',
    },
]

export const ColumnExtensionsState = [
    { columnName: 'rank', width: '10%', align: 'left' },
    { columnName: 'name', width: '15%', align: 'center' },
    { columnName: 'priceUsd', width: '20%', align: 'right' },
    { columnName: 'volumeUsd24Hr', width: '15%', align: 'right' },
    { columnName: 'marketCapUsd', width: '16%', align: 'right' },
    { columnName: 'id', width: '14%', align: 'center' },

]
export const cellStyles = (name) => {
    switch (name) {
        case 'rank':
            return { paddingLeft: '0px', paddingRight: '8px', paddingTop: '16px', paddingBottom: '16px', textAlign: 'center' }
        case 'name':
            return { textAlign: 'center' }
        case 'id':
            return { textAlign: 'center' }
        default: return { textAlign: 'right' }
    }
}
export const SortingColumnExtensionsState = [
    { columnName: 'id', sortingEnabled: false },
]
