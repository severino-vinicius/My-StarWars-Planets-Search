import { useState, useContext } from 'react';
import myContext from '../context/myContext';

function NumFilter() {
  const { selectedFilters,
    setPlanetsListFiltered,
    planetsListFiltered,
    setSelectedFilters } = useContext(myContext);

  const [dataFiltered, setDataFiltered] = useState({
    columnFilter: 'population',
    operatorFilter: 'maior que',
    valueToFilter: '0',
  });

  const handleClick = () => {
    const filterData = planetsListFiltered.filter((planet) => {
      if (dataFiltered.operatorFilter === 'maior que') {
        return Number(planet[dataFiltered
          .columnFilter]) > Number(dataFiltered.valueToFilter);
      }
      if (dataFiltered.operatorFilter === 'menor que') {
        return Number(planet[dataFiltered
          .columnFilter]) < Number(dataFiltered.valueToFilter);
      }
      if (dataFiltered.operatorFilter === 'igual a') {
        return Number(planet[dataFiltered
          .columnFilter]) === Number(dataFiltered.valueToFilter);
      }
      return true;
    });
    setSelectedFilters([...selectedFilters, dataFiltered]);
    setPlanetsListFiltered(filterData);
    setDataFiltered({
      columnFilter: 'population',
      operatorFilter: 'maior que',
      valueToFilter: '0',
    });
  };

  return (
    <div>
      <select
        name="columnToFilter"
        value={ dataFiltered.columnFilter }
        data-testid="column-filter"
        onChange={ ({ target }) => setDataFiltered({
          ...dataFiltered,
          columnFilter: target.value,
        }) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        name="operatorToFilter"
        data-testid="comparison-filter"
        value={ dataFiltered.operatorFilter }
        onChange={ ({ target }) => setDataFiltered({
          ...dataFiltered,
          operatorFilter: target.value,
        }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        value={ dataFiltered.valueToFilter }
        data-testid="value-filter"
        onChange={ ({ target }) => setDataFiltered({
          ...dataFiltered,
          valueToFilter: target.value,
        }) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumFilter;
