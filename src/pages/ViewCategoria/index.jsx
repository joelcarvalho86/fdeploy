import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ViewCategoria.css'; // Certifique-se de criar o arquivo de estilo ViewCategoria.css
import { getCategoriasProdutos, removeCategoriaProduto } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto

function ViewCategoria() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    carregaCategorias();
  }, [categorias]);

  const carregaCategorias = async () => {
    const categoriasResponse = await getCategoriasProdutos();
    setCategorias(await categoriasResponse.data);
  };

  const deleteCategoria = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar esta categoria de produto?");

    if (confirmacao) {
      const confirmacao1 = window.confirm("Pense bem, tem realmente certeza disso?");

      if (confirmacao1) {
        const confirmacao2 = window.confirm("Rapaz... Cuidado!");

        if (confirmacao2) {
          alert("Categoria de produto deletada!");
          await removeCategoriaProduto(id);
        } else {
          alert("Operação cancelada");
        }
      } else {
        alert("Operação cancelada");
      }
    } else {
      alert("Operação cancelada");
    }
  };

  return (
    <div className="view-container">
      <table>
        <thead>
          <tr className='tr1'>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td data-label="ID">{categoria.id}</td>
              <td data-label="Nome">{categoria.nome}</td>
              <td data-label="Descrição">{categoria.descricao}</td>
              <td>
                <Link to={`../edit/${encodeURIComponent(categoria.id)}`}>
                  <button style={{ marginRight: '5px' }}>
                    <FaEdit />
                  </button>
                </Link>

                <button onClick={() => deleteCategoria(categoria.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button><a href="/desktop" className="garcom-button">Voltar</a></button>
      </div>
    </div>
  );
}

export default ViewCategoria;
