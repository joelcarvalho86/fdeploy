import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ViewEstoque.css'; // Certifique-se de criar o arquivo de estilo ViewEstoque.css
import { getEstoques, removeEstoque } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto

function ViewEstoque() {
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    carregaEstoques();
  }, [estoques]);

  const carregaEstoques = async () => {
    const estoquesResponse = await getEstoques();
    setEstoques(await estoquesResponse.data);
  };

  const deleteEstoque = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar este item de estoque?");

    if (confirmacao) {
      const confirmacao1 = window.confirm("Pense bem, tem realmente certeza disso?");

      if (confirmacao1) {
        const confirmacao2 = window.confirm("Rapaz... Cuidado!");

        if (confirmacao2) {
          alert("Item de estoque deletado!");
          await removeEstoque(id);
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
            <th>ID do Produto</th>
            <th>Quantidade</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoques.map((estoques) => (
            <tr key={estoques.id}>
              <td data-label="ID">{estoques.id}</td>
              <td data-label="ID do Produto">{estoques.produtoId}</td>
              <td data-label="Quantidade">{estoques.quantidade}</td>
              <td data-label="Data de Atualização">{estoques.dataAtualizacao}</td>
              <td>
                <Link to={`../edit/${encodeURIComponent(estoques.id)}`}>
                  <button style={{ marginRight: '5px' }}>
                    <FaEdit />
                  </button>
                </Link>

                <button onClick={() => deleteEstoque(estoques.id)}>
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

export default ViewEstoque;
