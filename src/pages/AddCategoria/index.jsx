// pages/AddCategoria/index.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategoriaProduto } from '../../services/funcionario-requests'; // Atualize o import conforme necessário
import './addCategoria.css';

function AddCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({
    nome: '',
    descricao: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoria((categoriaAnterior) => ({
      ...categoriaAnterior,
      [name]: value,
    }));
  };

  const handleSalvarCategoria = async () => {
    // Lógica para salvar a categoria
    await addCategoriaProduto(categoria);
    alert('Categoria adicionada!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Nova Categoria</h1>
      <form autoComplete="off">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={categoria.nome}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={categoria.descricao}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <br />
        <br />

        <button type="button" onClick={handleSalvarCategoria}>
          Salvar Categoria
        </button>
      </form>
    </div>
  );
}

export default AddCategoria;
