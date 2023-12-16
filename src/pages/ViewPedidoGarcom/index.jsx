import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ViewPedidoGarcom.css'; // Certifique-se de criar o arquivo de estilo ViewPedidoGarcom.css
import { getPedidosGarcons, removePedidoGarcom } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto

function ViewPedidoGarcom() {
  const [pedidosGarcons, setPedidosGarcons] = useState([]);

  useEffect(() => {
    carregaPedidosGarcons();
  }, [pedidosGarcons]);

  const carregaPedidosGarcons = async () => {
    const pedidosGarconsResponse = await getPedidosGarcons();
    setPedidosGarcons(await pedidosGarconsResponse.data);
  };

  const deletePedidoGarcom = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar este pedido do garçom?");

    if (confirmacao) {
      const confirmacao1 = window.confirm("Pense bem, tem realmente certeza disso?");

      if (confirmacao1) {
        const confirmacao2 = window.confirm("Rapaz... Cuidado!");

        if (confirmacao2) {
          alert("Pedido do garçom deletado!");
          await removePedidoGarcom(id);
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
            <th>ID Produto</th>
            <th>Quantidade</th>
            <th>Mensagem</th>
            <th>Data e Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidosGarcons.map((pedidosGarcons) => (
            <tr key={pedidosGarcons.id}>
              <td data-label="ID">{pedidosGarcons.id}</td>
              <td data-label="ID Produto">{pedidosGarcons.produtoId}</td>
              <td data-label="Quantidade">{pedidosGarcons.quantidade}</td>
              <td data-label="Mensagem">{pedidosGarcons.Mensagem}</td>
              <td data-label="Data e Hora">{pedidosGarcons.dataHora}</td>
              <td>
                <Link to={`../edit/${encodeURIComponent(pedidosGarcons.id)}`}>
                  <button style={{ marginRight: '5px' }}>
                    <FaEdit />
                  </button>
                </Link>

                <button onClick={() => deletePedidoGarcom(pedidosGarcons.id)}>
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

export default ViewPedidoGarcom;
