import React, { useState, useEffect } from 'react';
import { getMovements } from '../helpers/Api';

export default function MovementsTable() {
  const [movements, setMovements] = useState([]);
  const [filterByType, setFilterByType] = useState([
    {
      param: 'tipo',
      comparison: 'Embarque',
    },
  ]);

  const { param, comparison } = filterByType[0];

  const [filterById] = useState('');

  async function getAllMovements() {
    const allMovements = await getMovements();

    setMovements(allMovements);
  };

  function handleDelete(id) {
    fetch(`https://localhost:7282/movements/${id}`, {
      method: 'DELETE',
      headers: {
        'Accepet': 'application/json',
        'Content-type': 'application/json'
      }
    });
  }

  useEffect(() => {
    getAllMovements();
  }, []);

  const filterDataResults = () => movements.filter((movement) => {
    if (comparison.includes('Embarque')) {
      return (movement[param] === 'Embarque')
    }
    if (comparison.includes('Descarga')) {
      return (movement[param] === 'Descarga')
    }
    if (comparison.includes('Gate in')) {
      return (movement[param] === 'Gate in')
    }
    if (comparison.includes('Gate out')) {
      return (movement[param] === 'Gate out')
    }
    if (comparison.includes('Reposicionamento')) {
      return (movement[param] === 'Reposicionamento')
    }
    if (comparison.includes('Pesagem')) {
      return (movement[param] === 'Pesagem')
    }
    if (comparison.includes('Scanner')) {
      return (movement[param] === 'Scanner')
    }

    return movement;
  });

  return (
    <div>
      <h2>Buscar Movimentações</h2>
      <select
        name='Comparison'
        className='filterOption'
        onChange={(e) => setFilterByType([{
          ...filterByType[0],
          comparison: e.target.value
        }])}
      >
        <option value="Embarque">Embarque</option>
        <option value="Descarga">Descarga</option>
        <option value="Gate in">Gate in</option>
        <option value="Gate out">Gate out</option>
        <option value="Reposicionamento">Reposicionamento</option>
        <option value="Pesagem">Pesagem</option>
        <option value="Scanner">Scanner</option>
      </select>
      <button
        type='button'
        className='filterButton'
        onClick={() => {
          setMovements(() => filterDataResults())
        }}
      >
        Buscar
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
            <th>Movimentação ID</th>
            <th>Tipo de movimentação</th>
            <th>Data de início</th>
            <th>Data de fim</th>
            <th>Container</th>
          </tr>
        </thead>
        <tbody>
          {movements && movements.filter((filterMov) => filterMov.tipo
            .includes(filterById)).map((movement) => (
              <tr>
                <td>{movement.movementId}</td>
                <td>{movement.tipo}</td>
                <td>{movement.dataInicio}</td>
                <td>{movement.dataFim}</td>
                <td>{movement.containerId}</td>
                <td>
                  <button
                    type='button'
                    onClick={() => handleDelete(movement.movementId)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}