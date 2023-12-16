import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduto, getProduto } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto
import './EditCardapio.css';

function EditProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    descricao: '',
    preco: '',
    quantidadeEstoque: '',
    categoriaId: '',
  });

  useEffect(() => {
    buscaProduto(id);
  }, []);

  const buscaProduto = async (id) => {
    const produtoDados = await (await getProduto(id)).data;
    setProduto(produtoDados);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto((produtoAnterior) => ({
      ...produtoAnterior,
      [name]: value,
    }));
  };

  const editarProduto = async (event) => {
    event.preventDefault();
    console.log(produto);
    await editProduto(produto);
    alert('As alterações foram realizadas com sucesso!');
    navigate('/view'); // Altere para a página desejada após a edição
  };

  return (
    <>
      <div className="form-container">
        <h1>Alterar Produto</h1>
        <form onSubmit={editarProduto}>
          <div className="form-group">
            <label htmlFor="id">ID do Produto</label>
            <input type="text" id="id" name="id" value={produto.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoriaId">ID da Categoria</label>
            <input
              type="text"
              id="categoriaId"
              name="categoriaId"
              value={produto.categoriaId}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Atualizar Produto</button>
        </form>
      </div>
    </>
  );
}

export default EditProduto;
