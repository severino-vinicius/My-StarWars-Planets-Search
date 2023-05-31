import { useContext } from 'react';
import myContext from '../context/myContext';

function PlanetNameFilter() {
  const { setFilteredByName } = useContext(myContext);
  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target }) => setFilteredByName(target.value) }
    />
  );
}

export default PlanetNameFilter;
