import React, { useState } from 'react';

export default function ContainersForm() {
  
  const [state, setState] = useState({
    cliente: '',
    numero: '',
    tipo: 20,
    situacao: 'Cheio',
    categoria: 'Importação'
  });

  const { cliente, numero, tipo, situacao, categoria } = state;

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };

    const data = await fetch('https://localhost:7282/containers', obj);

    window.location.reload(true);

    return data;
  }

  return (
    <div>
      <h2>Cadastrar novo Container</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='cliente'
          value={cliente}
          onChange={handleChange}
          placeholder='Cliente'
        />
         <input
          type='text'
          name='numero'
          value={numero}
          onChange={handleChange}
          placeholder='Número do Container'
        />
        <select
          name='tipo'
          value={tipo}
          onChange={handleChange}
        >
          <option value={20}>20</option>
          <option value={40}>40</option>
        </select>
        <select
          name='situacao'
          value={situacao}
          onChange={handleChange}
        >
          <option value={'Cheio'}>Cheio</option>
          <option value={'Vazio'}>Vazio</option>
        </select>
        <select
          name='categoria'
          value={categoria}
          onChange={handleChange}
        >
          <option value={'Importação'}>Importação</option>
          <option value={'Exportação'}>Exportação</option>
        </select>
        <button
          type='submit'
          onSubmit={handleSubmit}
        >
          Salvar
        </button>
      </form>
    </div>
  )
}