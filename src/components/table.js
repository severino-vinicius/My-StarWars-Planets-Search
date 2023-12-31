import { useContext, useEffect } from 'react';
import myContext from '../context/myContext';

function Table() {
  const {
    planetsList,
    planetsListFiltered,
    filteredByName,
    handlePlanetList,
    selectedFilters } = useContext(myContext);
  useEffect(() => {
    handlePlanetList();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> Rotation Period </th>
          <th> Orbital Period </th>
          <th> Diameter </th>
          <th> Climate </th>
          <th> Gravity </th>
          <th> Terrain </th>
          <th> Surface Water </th>
          <th> Population </th>
          <th> Films </th>
          <th> Created </th>
          <th> Edited </th>
          <th> URL </th>
        </tr>
      </thead>
      <tbody>
        { (!selectedFilters.length ? planetsList : planetsListFiltered)
          .filter(({ name }) => name.toLowerCase().includes(filteredByName.toLowerCase()))
          .map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>
                {name}
              </td>
              <td>
                {rotationPeriod}
              </td>
              <td>
                {orbitalPeriod}
              </td>
              <td>
                {diameter}
              </td>
              <td>
                {climate}
              </td>
              <td>
                {gravity}
              </td>
              <td>
                {terrain}
              </td>
              <td>
                {surfaceWater}
              </td>
              <td>
                {population}
              </td>
              <td>
                {films}
              </td>
              <td>
                {created}
              </td>
              <td>
                {edited}
              </td>
              <td>
                {url}
              </td>
            </tr>
          )) }
      </tbody>
    </table>
  );
}

export default Table;
