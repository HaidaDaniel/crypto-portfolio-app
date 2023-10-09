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
        name: 'marketCapUsd',
        title: 'Market Capitalization',
    },
    {
        name: 'sname',
        title: 'Add to fav',
    },
]

export const ColumnExtensionsState = [
    { columnName: 'id', width: '10%', align: 'left' },
    { columnName: 'name', width: '15%', align: 'center' },
    { columnName: 'priceUsd', width: '20%', align: 'right' },
    { columnName: 'volumeUsd24Hr', width: '15%', align: 'right' },
    { columnName: 'marketCapUsd', width: '16%', align: 'right' },
    { columnName: 'sname', width: '19%', align: 'center' },

]

export const cellStyles = (name) => {
    switch (name) {
        case 'id':
            return { paddingLeft: '0px', paddingRight: '8px', paddingTop: '16px', paddingBottom: '16px', textAlign: 'center' }
        case 'name':
            return { textAlign: 'center' }
        case 'sname':
            return { textAlign: 'center' }
        default: return { textAlign: 'right' }
    }
}

export const SortingColumnExtensionsState = [
    { columnName: 'sname', sortingEnabled: false },
]
