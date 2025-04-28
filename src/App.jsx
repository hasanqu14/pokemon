import React, { useState } from 'react';
import { useFetchPokemons } from './hooks/useFetchPokemons';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';


function App() {
  const { pokemons, loading, error, types } = useFetchPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);

  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === '' || pokemon.types.includes(selectedType))
    );
  });

  return (
    <div className="app">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <TypeFilter types={types} selectedType={selectedType} onTypeChange={handleTypeChange} />
      </div>
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && filteredPokemons.length === 0 && <p className="status">No Pokémon found.</p>}
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}

export default App;
