const POKEAPI = 'https://pokeapi.co/api/v2'

const getPokemons = async (): Promise<Pokemon[]> => {
  const data = await fetch(`${POKEAPI}/pokemon`)
  const { results } = (await data.json()) as PokeResponse
  return results
}

const getPokemon = async (name: string): Promise<Pokemon> => {
  const data = await fetch(`${POKEAPI}/pokemon/${name}`)
  const results = (await data.json()) as Pokemon
  return results
}

const mergePokemons = (response: Pokemon[], pokemons: Pokemon[]): Pokemon[] => {
  return pokemons.map((pokemon, index) => {
    return {
      ...pokemon,
      id: response[index].id,
      height: response[index].height,
      weight: response[index].weight
    }
  })
}

const getPokemonsWithAllInfo = async (
  initialPokemons: Pokemon[]
): Promise<Pokemon[]> => {
  const pokemonRequests: any[] = []

  initialPokemons.forEach((pokemon) => {
    pokemonRequests.push(getPokemon(pokemon.name))
  })

  const responses = await Promise.all<Pokemon[]>(pokemonRequests)
  return mergePokemons(responses, initialPokemons)
}

export { getPokemon, getPokemons, getPokemonsWithAllInfo }
