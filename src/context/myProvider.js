import { useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import fetchPlanetsApi from '../services/PlanetApiRequest';

function MyProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  const handlePlanetList = async () => {
    const planetsLis = await fetchPlanetsApi();
    setPlanetsList(planetsLis);
  };

  const values = { planetsList, handlePlanetList };

  return (
    <myContext.Provider value={ values }>
      {children}
    </myContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default MyProvider;
