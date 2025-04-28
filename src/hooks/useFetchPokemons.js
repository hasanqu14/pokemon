import { useState, useEffect } from 'react';

export function useFetchPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((typeInfo) => typeInfo.type.name)
            };
          })
        );
        setPokemons(pokemonDetails);

        // Get all unique types
        const allTypes = new Set();
        pokemonDetails.forEach((pokemon) => {
          pokemon.types.forEach((type) => allTypes.add(type));
        });
        setTypes([...allTypes]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon. Please try again.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { pokemons, loading, error, types };
}
