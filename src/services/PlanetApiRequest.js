const url = 'https://swapi.dev/api/planets';

const fetchPlanetsApi = async () => {
  const response = await fetch(url);
  const dataResponse = await response.json();
  const dataPlanets = dataResponse.results.filter((planet) => {
    delete planet.residents;
    return planet;
  });
  return dataPlanets;
};

export default fetchPlanetsApi;
