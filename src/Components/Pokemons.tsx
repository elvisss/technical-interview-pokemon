import { usePokemons } from '../hooks/usePokemons'
import { Sort } from './Sort'

export const Pokemons = () => {
  const { loading, error, sortedPokemons: pokemons, sortPokemons } = usePokemons()

  if (loading) return <h3>Loading...</h3>
  if (error) return <h3>An Error Ocurred, please try again later</h3>

  return (
    <>
      <table>
        <thead>
          <tr>
            <Sort title="ID" field="id" onSort={sortPokemons} />
            <Sort title="Name" field="name" onSort={sortPokemons} />
            <Sort title="Url" field="url" onSort={sortPokemons} />
            <Sort title="Height" field="height" onSort={sortPokemons} />
            <Sort title="Weight" field="weight" onSort={sortPokemons} />
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => {
            return (
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
                <td>{pokemon.url}</td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
