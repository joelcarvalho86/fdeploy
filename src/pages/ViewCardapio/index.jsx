import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ViewCardapio.css'; // Certifique-se de criar o arquivo de estilos ViewProduto.css
import { getProdutos, removeProduto } from '../../services/funcionario-requests';

function ViewProduto() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregaProdutos();
  }, []);

  const carregaProdutos = async () => {
    const produtosResponse = await getProdutos();
    setProdutos(await produtosResponse.data);
  };

  const deleteProduto = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja deletar este produto?');

    if (confirmacao) {
      const confirmacao1 = window.confirm('Pense bem, tem realmente certeza disso?');

      if (confirmacao1) {
        const confirmacao2 = window.confirm('Rapaz... Cuidado!');

        if (confirmacao2) {
          alert('Produto deletado!');
          await removeProduto(id);
        } else {
          alert('Operação cancelada');
        }
      } else {
        alert('Operação cancelada');
      }
    } else {
      alert('Operação cancelada');
    }
  };

  return (
    <div className="view-container">
      <h1>Cardápio</h1>
      <table className="tb1">
        <thead>
          <tr className="tr1">
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>

          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td data-label="ID">{produto.id}</td>
              <td data-label="Nome">{produto.nome}</td>
              <td data-label="Descrição">{produto.descricao}</td>
              <td data-label="Preço">{produto.preco.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table  >
      <div className="button-container">
        <button>
          <a href="/desktop" className="garcom-button">
            Voltar
          </a>
        </button>
      </div>
    </div>
  );
}

export default ViewProduto;
/*

<th>Quantidade em Estoque</th>
            <th>Categoria ID</th>

              <td data-label="Quantidade em Estoque">{produto.quantidadeEstoque}</td>
              <td data-label="Categoria ID">{produto.categoriaId}</td>
   <th>Ações</th>
<td>
                <Link to={`../edit/${encodeURIComponent(produto.id)}`}>
                  <button style={{ marginRight: '5px' }}>
                    <FaEdit />
                  </button>
                </Link>

                <button onClick={() => deleteProduto(produto.id)}>
                  <FaTrash />
                </button>
              </td>

*/