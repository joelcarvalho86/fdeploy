// pages/AddMesa/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMesa } from '../../services/funcionario-requests'; // Atualize o import conforme necessário
import './addMesa.css';

function AddMesa() {
  const navigate = useNavigate();
  const [mesa, setMesa] = useState({
    funcionarioId: '',
    status: '',
  });

  useEffect(() => {
    // Lógica para carregar dados necessários, como a lista de funcionários, etc.
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMesa((mesaAnterior) => ({
      ...mesaAnterior,
      [name]: value,
    }));
  };

  const handleSalvarMesa = async () => {
    // Lógica para salvar a mesa
    await addMesa(mesa);
    alert('Mesa adicionada!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Nova Mesa</h1>
      <form autoComplete="off">
        <div className="form-group">
          <label htmlFor="funcionarioId">Funcionário</label>
          <input
            type="text"
            id="funcionarioId"
            name="funcionarioId"
            value={mesa.funcionarioId}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={mesa.status}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <br />
        <br />

        <button type="button" onClick={handleSalvarMesa}>
          Salvar Mesa
        </button>
      </form>
    </div>
  );
}

export default AddMesa;
