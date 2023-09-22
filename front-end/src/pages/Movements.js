import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovementsTable from '../components/MovementTable';
import MovementsForm from '../components/MovementForm';

export default function Movements() {
  const navigate = useNavigate();

  return (
    <div>
      <MovementsForm />
      <MovementsTable />
      <hr/>
      <button
        type='button'
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </div>
  );
}