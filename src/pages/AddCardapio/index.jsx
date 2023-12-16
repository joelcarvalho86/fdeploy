// pages/AddProduto/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduto } from '../../services/funcionario-requests'; // Atualize o import conforme necessário
import './addCardapio.css';

function AddProduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidadeEstoque: '',
    categoriaId: '',
  });

  useEffect(() => {
    // Lógica para carregar dados necessários, como a lista de categorias, etc.
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto((produtoAnterior) => ({
      ...produtoAnterior,
      [name]: value,
    }));
  };

  const handleSalvarProduto = async () => {
    // Lógica para salvar o produto
    await addProduto(produto);
    alert('Produto adicionado!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Novo Produto</h1>
      <form autoComplete="off">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
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
            value={produto.descricao}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco">Preço</label>
          <input
            type="text"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidadeEstoque">Quantidade em Estoque</label>
          <input
            type="text"
            id="quantidadeEstoque"
            name="quantidadeEstoque"
            value={produto.quantidadeEstoque}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoriaId">Categoria ID</label>
          <input
            type="text"
            id="categoriaId"
            name="categoriaId"
            value={produto.categoriaId}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <br />
        <br />

        <button type="button" onClick={handleSalvarProduto}>
          Salvar Produto
        </button>
      </form>
    </div>
  );
}

export default AddProduto;
