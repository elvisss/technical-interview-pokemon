import { useEffect, useState } from 'react'
import { getPokemons, getPokemonsWithAllInfo } from '../services/pokemon'

export const usePokemons = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [initialPokemons, setInitialPokemons] = useState<Pokemon[]>([])
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [sortedPokemons, setSortedPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    getPokemons()
      .then((response) => {
        setInitialPokemons(response)
      })
      .catch(() => {
        setError(true)
      })
  }, [])

  useEffect(() => {
    if (!initialPokemons.length) return

    getPokemonsWithAllInfo(initialPokemons)
      .then((pokemons) => {
        setPokemons(pokemons)
        setSortedPokemons(pokemons)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [initialPokemons])

  const sortPokemons = (sort: SortType, field: pokemonsKeys) => {
    if (sort === 'none') {
      setSortedPokemons([...pokemons])
      return
    }

    const sortedPokemons = [...pokemons].sort((a: Pokemon, b: Pokemon) => {
      if (sort === 'desc') {
        if (a[field] > b[field]) {
          return -1
        }
        if (a[field] < b[field]) {
          return 1
        }
      }
      if (sort === 'asc') {
        if (a[field] > b[field]) {
          return 1
        }
        if (a[field] < b[field]) {
          return -1
        }
      }
      return 0
    })

    setSortedPokemons(sortedPokemons)
  }

  return {
    sortedPokemons,
    sortPokemons,
    loading,
    error
  }
}
