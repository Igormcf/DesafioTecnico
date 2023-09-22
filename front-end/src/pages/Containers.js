import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainersTable from '../components/ContainerTable';
import ContainersForm from '../components/ContainersForm';

export default function Containers() {
  const navigate = useNavigate();

  return (
    <div>
      <ContainersForm />
      <hr/>
      <ContainersTable />
      <hr/>
      <button
        type='button'
        onClick={() => navigate('/movements')}
      >
        Ver Movimentações
      </button>
    </div>
  )
}