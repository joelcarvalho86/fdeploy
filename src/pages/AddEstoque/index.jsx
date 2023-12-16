// pages/AddEstoque/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEstoque } from '../../services/funcionario-requests'; // Atualize o import conforme necessário
import './addEstoque.css';

function AddEstoque() {
  const navigate = useNavigate();
  const [estoque, setEstoque] = useState({
    produtoId: '',
    quantidade: '',
    dataAtualizacao: '',
  });

  useEffect(() => {
    // Lógica para carregar dados necessários, como a lista de produtos, etc.
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEstoque((estoqueAnterior) => ({
      ...estoqueAnterior,
      [name]: value,
    }));
  };

  const handleSalvarEstoque = async () => {
    // Lógica para salvar o estoque
    await addEstoque(estoque);
    alert('Estoque adicionado!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Novo Estoque</h1>
      <form autoComplete="off">
        <div className="form-group">
          <label htmlFor="produtoId">Produto ID</label>
          <input
            type="text"
            id="produtoId"
            name="produtoId"
            value={estoque.produtoId}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="text"
            id="quantidade"
            name="quantidade"
            value={estoque.quantidade}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataAtualizacao">Data de Atualização</label>
          <input
            type="text"
            id="dataAtualizacao"
            name="dataAtualizacao"
            value={estoque.dataAtualizacao}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <br />
        <br />

        <button type="button" onClick={handleSalvarEstoque}>
          Salvar Estoque
        </button>
      </form>
    </div>
  );
}

export default AddEstoque;
