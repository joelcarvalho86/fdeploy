import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './ViewPedidos.css';
import { getItensEmAndamento, getItensEntregue, updateItemPedido, atualizarStatusConcluido } from '../../services/funcionario-requests';

function ViewPedidos() {
  const [itensEmAndamento, setItensEmAndamento] = useState([]);
  const [itensEntregues, setItensEntregues] = useState([]);

  useEffect(() => {
    carregaItens();

    // Atualizar o tempo decorrido a cada segundo
    const intervalId = setInterval(() => {
      calcularTempoDecorrido();
    }, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    carregaItens();
  }, []);

  const calcularTempoDecorrido = () => {
    setItensEmAndamento((itens) =>
      itens.map((item) => {
        const agora = new Date();
        const diferenca = agora - new Date(item.pedido.data);
        const segundosDecorridos = Math.floor(diferenca / 1000);

        const horas = Math.floor(segundosDecorridos / 3600);
        const minutos = Math.floor((segundosDecorridos % 3600) / 60);
        const segundos = segundosDecorridos % 60;

        return {
          ...item,
          tempo: `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`,
        };
      })
    );
  };

  const carregaItens = async () => {
    const itensEmAndamentoResponse = await getItensEmAndamento();
    const itensEntreguesResponse = await getItensEntregue();

    setItensEmAndamento(await itensEmAndamentoResponse.data);
    setItensEntregues(await itensEntreguesResponse.data);
  };

  const entregarItemPedido = async (id, tempo) => {
    const confirmacao = window.confirm("Confirmar entrega do item?");
    if (confirmacao) {
      try {

        // Wait for the state to update before using item.tempo
        await setItensEmAndamento((itens) =>
          itens.map((item) => (item.id === id ? { ...item, tempo } : item))
        );
        // Chama a função de entrega do item
        await updateItemPedido(id, tempo);
        alert("Item entregue!");
        carregaItens(); // Atualiza a lista após a entrega
      } catch (error) {
        alert(`ViewPedidos - Erro ao entregar o item: ${error.message}`);
      }
    } else {
      alert("Operação cancelada");
    }
  };

  const ConcluirItemPedido = async (id) => {
    const confirmacao = window.confirm("Confirmar entrega do item?");

    if (confirmacao) {
      try {
        // Chama a função de entrega do item
        await atualizarStatusConcluido(id);
        alert("Item entregue!");
        carregaItens(); // Atualiza a lista após a entrega
      } catch (error) {
        alert(`ViewPedidos - Erro ao entregar o item: ${error.message}`);
      }
    } else {
      alert("Operação cancelada");
    }
  };
  return (
    <div className="view-container3">
      <div className="tabelas-container3">
        {/* Tabela de Itens em Andamento */}
        <div className="tabela-itens-em-andamento3">
          <h2>Lista de Prioridades</h2>
          <table>
            <thead>
              <tr className='tr1'>
                <th>Id</th>
                <th>Quantidade</th>
                <th>Nome do Produto</th>
                <th>Mesa</th>
                <th>Garçom</th>
                <th>Hora do Pedido</th>
                <th>Tempo</th>
                <th>Entregar</th>
              </tr>
            </thead>
            <tbody>
              {itensEmAndamento.map((item, index) => (
                <tr key={item.id} style={index < 5 ? { fontSize: '1.5em', fontWeight: 'bold', color: 'blue' } : null}>
                  <td data-label="Id">{item.id}</td>
                  <td data-label="Quantidade">{item.quantidade}</td>
                  <td data-label="Nome do Produto">{item.produto.nome}</td>
                  <td data-label="Mesa">{item.pedido.mesaId}</td>
                  <td data-label="Garçom">{item.pedido.funcionario.nome}</td>
                  <td data-label="Hora do Pedido">{new Date(item.pedido.data).toLocaleTimeString()}</td>
                  <td data-label="Tempo">{item.tempo}</td>
                  <td data-label="Entregar">
                    <button style={{ fontSize: '12px', padding: '5px' }} onClick={() => entregarItemPedido(item.id, item.tempo)}>
                      <FaCheck />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabela de Itens Entregues */}
        <div className="tabela-itens-entregues3">
          <h2>Itens à Entregar</h2>
          <table>
            <thead>
              <tr className='tr1'>
                <th>Quantidade</th>
                <th>Nome do Produto</th>
                <th>Mesa</th>
                <th>Garçom</th>
                <th>Concluído</th>
              </tr>
            </thead>
            <tbody>
              {itensEntregues.map((item) => (
                <tr key={item.id}>
                  <td data-label="Quantidade">{item.quantidade}</td>
                  <td data-label="Nome do Produto">{item.produto.nome}</td>
                  <td data-label="Mesa">{item.pedido.mesaId}</td>
                  <td data-label="Garçom">{item.pedido.funcionario.nome}</td>
                  <td data-label="Concluído">
                    <button style={{ fontSize: '12px', padding: '5px' }} onClick={() => ConcluirItemPedido(item.id)}>
                      <FaCheck />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="button-container">
        <button><a href="/desktop" className="garcom-button">Voltar</a></button>
      </div>
    </div>
  );
}

export default ViewPedidos;
