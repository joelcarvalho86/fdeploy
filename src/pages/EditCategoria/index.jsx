import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editCategoriaProduto, getCategoriaProduto } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto
import './EditCategoria.css';

function EditCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({
    id: '',
    nome: '',
    descricao: '',
  });

  useEffect(() => {
    buscaCategoria(id);
  }, []);

  const buscaCategoria = async (id) => {
    const categoriaDados = await (await getCategoriaProduto(id)).data;
    setCategoria(categoriaDados);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoria((categoriaAnterior) => ({
      ...categoriaAnterior,
      [name]: value,
    }));
  };

  const editarCategoria = async (event) => {
    event.preventDefault();
    console.log(categoria);
    await editCategoriaProduto(categoria);
    alert('As alterações foram realizadas com sucesso!');
    navigate('/view'); // Altere para a página desejada após a edição
  };

  return (
    <>
      <div className="form-container">
        <h1>Alterar Categoria</h1>
        <form onSubmit={editarCategoria}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={categoria.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={categoria.nome}
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
              value={categoria.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Atualizar Categoria</button>
        </form>
      </div>
    </>
  );
}

export default EditCategoria;
