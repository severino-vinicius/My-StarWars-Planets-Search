import React from 'react';
import Table from './components/table';
import PlanetNameFilter from './components/NameFilter';
import './App.css';
import NumFilter from './components/NumFilter';

function App() {
  return (
    <>
      <PlanetNameFilter />
      <NumFilter />
      <Table />
    </>

  );
}

export default App;
