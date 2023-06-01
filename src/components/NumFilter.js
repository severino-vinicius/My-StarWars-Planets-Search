import { useState, useContext } from 'react';
import myContext from '../context/myContext';

function NumFilter() {
  const { planetsList, setPlanetsList } = useContext(myContext);
  const [columnFilter, setcolumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [valueToFilter, setValueToFilter] = useState('0');

  const handleClick = () => {
    // console.log(columnFilter, operatorFilter, valueToFilter);
    const filterData = planetsList.filter((planet) => {
      if (operatorFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(valueToFilter);
      }
      if (operatorFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(valueToFilter);
      }
      if (operatorFilter === 'igual a') {
        return Number(planet[columnFilter]) === Number(valueToFilter);
      }
      return true;
    });
    setPlanetsList(filterData);
    setcolumnFilter('population');
    setOperatorFilter('maiorQue');
    setValueToFilter('0');
  };

  return (
    <div>
      <select
        name="columnToFilter"
        value={ columnFilter }
        data-testid="column-filter"
        onChange={ ({ target }) => setcolumnFilter(target.value) }
      >
        <option value="population"> Population </option>
        <option value="orbital_period"> Orbital Period </option>
        <option value="diameter"> Diameter </option>
        <option value="rotation_period"> Rotation Period </option>
        <option value="surface_water"> Surface Water </option>
      </select>

      <select
        name="operatorToFilter"
        data-testid="comparison-filter"
        value={ operatorFilter }
        onChange={ ({ target }) => setOperatorFilter(target.value) }
      >
        <option value="maior que"> maior que </option>
        <option value="menor que"> menor que </option>
        <option value="igual a"> igual a </option>
      </select>

      <input
        type="number"
        value={ valueToFilter }
        data-testid="value-filter"
        onChange={ ({ target }) => setValueToFilter(target.value) }
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
