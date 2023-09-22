import React, { useState, useEffect } from 'react';
import { getContainers } from '../helpers/Api';

export default function ContainersTable() {
  const [containers, setContainers] = useState([]);
  const [filterByClient, setFilterByClient] = useState('');
  const [filterById, setFilterById] = useState('');
  const [filterByCategory, setFilterByCategory] = useState([
    {
      param: 'categoria',
      comparison: 'Importação',
    },
  ]);

  const { param, comparison } = filterByCategory[0];

  async function getAllContainers() {
    const allContainers = await getContainers();

    setContainers(allContainers);
  };

  useEffect(() => {
    getAllContainers();
  }, []);

  const filterDataResults = () => containers.filter((container) => {
    if (comparison.includes('Importação')) {
      return (container[param] === 'Importação')
    }
    if (comparison.includes('Exportação')) {
      return (container[param] === 'Exportação')
    }

    return container;
  })

  return (
    <div>
      <h2>Filtrar Containers</h2>
      <input
        type='text'
        className='search'
        placeholder='Filtrar pelo Id do Container'
        onChange={(e) => setFilterById(e.target.value)}
      />
      <input
        type='text'
        className='search'
        placeholder='Filtrar por cliente'
        onChange={(e) => setFilterByClient(e.target.value)}
      />
      <select
        name='Comparison'
        className='filterOption'
        onChange={(e) => setFilterByCategory([{
          ...filterByCategory[0],
          comparison: e.target.value
        }])}
      >
        <option value="Importação">Importação</option>
        <option value="Exportação">Exportação</option>
      </select>
      <button
        type='button'
        className='filterButton'
        onClick={() => {
          setContainers(() => filterDataResults())
        }}
      >
        Filtrar
      </button>
      <button
        className='cleanButton'
        onClick={() => {
          var url = window.location.href + '?filter=true';

          window.location.href = url;
        }}
      >
        Limpar
      </button>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Container Id</th>
            <th>Cliente</th>
            <th>Número do Container</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {containers && containers.filter((filterCotainer) => filterCotainer.cliente.includes(filterByClient || filterById)).map((container) => (
            <tr>
              <td>{container.containerId}</td>
              <td>{container.cliente}</td>
              <td>{container.numero}</td>
              <td>{container.tipo}</td>
              <td>{container.situacao}</td>
              <td>{container.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}