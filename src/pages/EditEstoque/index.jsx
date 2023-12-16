import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editEstoque, getEstoque } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto
import './EditEstoque.css';

function EditEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estoque, setEstoque] = useState({
    id: '',
    produtoId: '',
    quantidade: '',
    dataAtualizacao: '',
  });

  useEffect(() => {
    buscaEstoque(id);
  }, []);

  const buscaEstoque = async (id) => {
    const estoqueDados = await (await getEstoque(id)).data;
    setEstoque(estoqueDados);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEstoque((estoqueAnterior) => ({
      ...estoqueAnterior,
      [name]: value,
    }));
  };

  const editarEstoque = async (event) => {
    event.preventDefault();
    console.log(estoque);
    await editEstoque(estoque);
    alert('As alterações foram realizadas com sucesso!');
    navigate('/view'); // Altere para a página desejada após a edição
  };

  return (
    <>
      <div className="form-container">
        <h1>Alterar Estoque</h1>
        <form onSubmit={editarEstoque}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={estoque.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="produtoId">ID do Produto</label>
            <input
              type="text"
              id="produtoId"
              name="produtoId"
              value={estoque.produtoId}
              onChange={handleChange}
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
              required
            />
          </div>

          <button type="submit">Atualizar Estoque</button>
        </form>
      </div>
    </>
  );
}

export default EditEstoque;
