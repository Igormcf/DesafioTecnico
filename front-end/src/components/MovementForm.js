import React, { useState } from 'react';

export default function MovementsForm() {
  const [state, setState] = useState({
    tipo: 'Embarque',
    dataInicio: '',
    dataFim: '',
    containerId: null
  });

  const { tipo, dataInicio, dataFim, containerId } = state;

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

    const data = await fetch('https://localhost:7282/movements', obj);

    window.location.reload(true);

    return data;
  };

  return (
    <div>
      <h2>Cadastrar nova Movimentação</h2>
      <form onSubmit={handleSubmit}>
        <select
          name='tipo'
          value={tipo}
          onChange={handleChange}
        >
          <option value='Embarque'>Embarque</option>
          <option value='Descarga'>Descarga</option>
          <option value='Gate in'>Gate in</option>
          <option value='Gate out'>Gate out</option>
          <option value='Reposicionamento'>Reposicionamento</option>
          <option value='Pesagem'>Pesagem</option>
          <option value='Scanner'>Scanner</option>
        </select>
        <input
          type='text'
          name='dataInicio'
          value={dataInicio}
          onChange={handleChange}
          placeholder='Data de Início'
        />
        <input
          type='text'
          name='dataFim'
          value={dataFim}
          onChange={handleChange}
          placeholder='Data de Fim'
        />
        <input
          type='text'
          name='containerId'
          value={containerId}
          onChange={handleChange}
          placeholder='Id do Container'
        />
        <button
          type='submit'
          onSubmit={handleSubmit}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}