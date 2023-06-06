import { useState, useContext, useEffect } from 'react';
import myContext from '../context/myContext';

function NumFilter() {
  const { selectedFilters,
    setPlanetsListFiltered,
    planetsList,
    setSelectedFilters } = useContext(myContext);

  const [dataFiltered, setDataFiltered] = useState({
    columnFilter: 'population',
    operatorFilter: 'maior que',
    valueToFilter: '0',
  });

  const optionsCol = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const handleClick = () => {
    setSelectedFilters((prev) => [...prev, dataFiltered]);
    setDataFiltered({
      columnFilter: 'population',
      operatorFilter: 'maior que',
      valueToFilter: '0',
    });
  };

  useEffect(() => {
    let planetsFiltered = planetsList;
    selectedFilters.forEach(({
      operatorFilter,
      columnFilter,
      valueToFilter }) => {
      planetsFiltered = planetsFiltered.filter((planet) => {
        if (operatorFilter === 'maior que') {
          return Number(planet[columnFilter]) > Number(valueToFilter);
        }
        if (operatorFilter === 'menor que') {
          return Number(planet[columnFilter]) < Number(valueToFilter);
        }
        if (operatorFilter === 'igual a') {
          return Number(planet[columnFilter]) === Number(valueToFilter);
        }
        return false;
      });
      setPlanetsListFiltered(planetsFiltered);
    });
  }, [selectedFilters]);

  const optionFilter = (option) => !selectedFilters
    .find((filtro) => option === filtro.columnFilter);

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
        {optionsCol.filter(optionFilter).map((columnFilter) => (
          <option value={ columnFilter } key={ columnFilter }>
            {columnFilter}
          </option>))}
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
      {selectedFilters.map(({ columnFilter, operatorFilter, valueToFilter }, index) => (
        <div key={ index } data-testid="filter">
          <span>
            {columnFilter}
            {operatorFilter}
            {valueToFilter}
          </span>
          <button
            onClick={ () => {
              const cloneArray = [...selectedFilters];
              cloneArray.splice(index, 1);
              setSelectedFilters(cloneArray);
            } }
          >
            x
          </button>
        </div>
      ))}

      <button
        onClick={ () => {
          const clearAllFilters = [];
          setSelectedFilters(clearAllFilters);
        } }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default NumFilter;
