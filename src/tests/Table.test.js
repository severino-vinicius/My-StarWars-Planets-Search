import RenderWithProvider from './helpers/RenderWithProvider';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from '../components/table';
import App from '../App';
import PlanetMock from './mock/PlanetMock';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(PlanetMock)
  })
})

afterEach(jest.restoreAllMocks)

describe('Testes StarWars Planets', () => {

  it('Verificar se existe Tabela na tela', async () => {
    RenderWithProvider(<Table />)

    screen.findByRole('table');
  })

  it('Verificar se a mock da Api esta sendo chamada', async () => {
    RenderWithProvider(<App />)

    expect(global.fetch).toHaveBeenCalled()
  })

  it('Verifica se o filtro númerico funciona', async () => {
    RenderWithProvider(<App />)

    const column = screen.getByTestId('column-filter')
    await act(async () => {
      userEvent.selectOptions(column, "diameter");
    })

    const operatorIgual = screen.getByTestId('comparison-filter')
    await act(async () => {
      userEvent.selectOptions(operatorIgual, "menor que");
    });
    
    const valueToFilter = screen.getByRole('spinbutton')
    await act(async () => {
      userEvent.type(valueToFilter, '10200');
    })

    const filterBtn = screen.getByRole('button', {
      name: /filtrar/i
    });
    userEvent.click(filterBtn);

     await waitFor(() => {
       const planetFiltro1 = screen.getByText(/endor/i)
       expect(planetFiltro1).toBeInTheDocument();
     })
  })
  
  it('Verifica se o filtro igual a esta filtrando corretamente ', async () => {
    RenderWithProvider(<App />)

    const column = screen.getByTestId('column-filter')
    await act(async () => {
      userEvent.selectOptions(column, "rotation_period");
    })

    const operatorIgual = screen.getByTestId('comparison-filter')
    await act(async () => {
      userEvent.selectOptions(operatorIgual, "igual a");
    });
    
    const valueToFilter = screen.getByRole('spinbutton')
    await act(async () => {
      userEvent.type(valueToFilter, '12');
    })

    const filterBtn = screen.getByRole('button', {
      name: /filtrar/i
    });
    userEvent.click(filterBtn);

     await waitFor(() => {
       const planetFiltro1 = screen.getByText(/bespin/i)
       expect(planetFiltro1).toBeInTheDocument();
     })
  })

  it('Verifica se o botão "remover todos os filtros" remove os filtros', async () => {
    RenderWithProvider(<App />)

    const column = screen.getByTestId('column-filter')
    await act(async () => {
      userEvent.selectOptions(column, "diameter");
    })

    const operatorIgual = screen.getByTestId('comparison-filter')
    await act(async () => {
      userEvent.selectOptions(operatorIgual, "maior que");
    });
    
    const valueToFilter = screen.getByRole('spinbutton')
    await act(async () => {
      userEvent.type(valueToFilter, '10200');
    })

    const filterBtn = screen.getByRole('button', {
      name: /filtrar/i
    });
    userEvent.click(filterBtn);

     await waitFor(() => {
       const planetFiltro1 = screen.getByText(/tatooine/i)
       expect(planetFiltro1).toBeInTheDocument();
     })

    const removeAllFilterBtn = screen.getByRole('button', {
      name: /remover todas filtragens/i
    })
    userEvent.click(removeAllFilterBtn);

    const planet = screen.getByRole('cell', {  name: /hoth/i})
    expect(planet).toBeInTheDocument();
  })

  it('Verifica se o filtro por palavra funciona',async () => {
    RenderWithProvider(<App />)

    const filterByName = screen.getByTestId('name-filter')
    await act(async () => {
      userEvent.type(filterByName, 'tatooine')
    })

    await waitFor(() => {
      const planetFiltro1 = screen.getByText(/tatooine/i)
      expect(planetFiltro1).toBeInTheDocument();
    })
  })
});