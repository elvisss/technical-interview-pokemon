import { useState } from 'react'

interface Props {
  title: string
  field: pokemonsKeys
  onSort: (sort: SortType, field: pokemonsKeys) => void
}

export const Sort: React.FC<Props> = ({ title, field, onSort }) => {
  const [sort, setSort] = useState<SortType>('none')

  const handleClick = () => {
    let newSort: SortType
    if (sort === 'none') {
      newSort = 'asc'
    } else if (sort === 'asc') {
      newSort = 'desc'
    } else {
      newSort = 'none'
    }
    setSort(newSort)
    onSort(newSort, field)
  }

  return (
    <th onClick={handleClick}>
      {title} {sort === 'none' ? '' : (sort === 'asc' ? '🔼' : '🔽')}
    </th>
  )
}
