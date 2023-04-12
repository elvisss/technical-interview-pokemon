interface Pokemon {
  base_experience: number
  height: number
  id: number
  is_default: boolean
  location_area_encounters: string
  name: string
  order: number
  weight: number
  url: string
}

type SortType = 'asc' | 'desc' | 'none'

interface PokeResponse {
  count: number
  next: string
  previous: null
  results: Pokemon[]
}

type pokemonsKeys = keyof Pokemon
