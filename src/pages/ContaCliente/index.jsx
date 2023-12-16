import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './ContaCliente.css';
import { getItensPorMesa, atualizarStatusPago, getMesas, getItensPorMesaDetalhado } from '../../services/funcionario-requests';

function ContaCliente() {
  const [itensEmAndamento, setItensEmAndamento] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [mesaId, setMesaId] = useState('');
  const [contaDetalhada, setContaDetalhada] = useState(false); // Novo estado
  const [totais, setTotais] = useState({
    totalSubtotal: 0,
    comissao: 0,
    totalGeral: 0,
  });



  useEffect(() => {
    const carregarMesas = async () => {
      try {
        const mesasResponse = await getMesas();
        setMesas(await mesasResponse.data);
      } catch (error) {
        console.error('Erro ao carregar mesas:', error);
      }
    };

    carregarMesas();
  }, []);


  const handleChangePedido = async (event) => {
    const { name, value, checked  } = event.target;

    if (name === 'mesaId' && !/^\d*$/.test(value)) {
      alert('Por favor, insira apenas números para a mesa.');
      return;
    }

    try {
      let itensPorMesaResponse;
      let idfunclogin = localStorage.getItem('idfunclogin');

      if (checked) {
        itensPorMesaResponse = await getItensPorMesaDetalhado(value, idfunclogin);
      } else {
        itensPorMesaResponse = await getItensPorMesa(value, idfunclogin);
      }

      const itens = itensPorMesaResponse.data;
      setItensEmAndamento(itens);
      // Calcular totais
      const totalSubtotal = itens.reduce((acc, item) => acc + item.totalSubtotal, 0);
      const comissao = totalSubtotal * 0.1;
      const totalGeral = totalSubtotal + comissao;
      setTotais({ totalSubtotal, comissao, totalGeral });
    } catch (error) {
      alert("ERRO: " + JSON.stringify(itens, null, 2));
      console.error('Erro ao carregar itens:', error);
    }
  };

  const handleCheckboxChange = async () => {
    setContaDetalhada((prevState) => !prevState);
     // Agora, chame a função handleChangePedido diretamente aqui
    handleChangePedido({ target: { name: 'mesaId', value: mesaId , checked: !contaDetalhada } });
  };

  // No JSX, mantenha a lógica para a tabela e o select como está

  // No JSX, mantenha a lógica para a tabela e o select como está


  //setItensEmAndamento(await itensPorMesaResponse.data);

  const cancelarItemPedido = async (id) => {
    // Sua lógica para entregar item aqui
    try {
      if (mesaId) {
        await atualizarStatusPago(mesaId);
        carregaItens(); // Atualize a lista de itens após a atualização
      } else {
        alert('Selecione uma mesa para atualizar o status.');
      }
    } catch (error) {
      console.error('Erro ao atualizar status para pago:', error);
    }
  };

  const atualizarStatusParaPago = async () => {
    try {
      if (mesaId) {
        await atualizarStatusPago(mesaId);
        carregaItens(); // Atualize a lista de itens após a atualização
      } else {
        alert('Selecione uma mesa para atualizar o status.');
      }
    } catch (error) {
      console.error('Erro ao atualizar status para pago:', error);
    }
  };

  return (
    <div className="view-container2">

      <h2>Conta do Cliente</h2>

      <div className="mesa-selector" style={{ fontWeight: '1.2em' }}>
        <label htmlFor="mesaId" style={{ marginRight: '10px', fontSize: '1.2em' }}>Mesa: </label>
        <select
          name="mesaId"
          value={mesaId}
          onChange={(event) => {
            setMesaId(event.target.value);
            handleChangePedido(event); // Chame o handleChangePedido após atualizar o estado
          }} style={{ width: '300px', marginRight: '10px', fontSize: '1.2em' }}
        >
          <option value="">Mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              {mesa.id}
            </option>
          ))}
        </select>



        <label style={{ marginRight: '10px' }}>Garçom: {localStorage.getItem('nome')}</label>

        {/* Adicione um checkbox para alternar entre conta detalhada e agrupada */}
        <div className="checkbox-container">
          <label style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <span style={{ marginRight: '5px' }}>Conta Detalhada</span>
            <input
              type="checkbox"
              checked={contaDetalhada}
              onChange={handleCheckboxChange}
              style={{ width: '15px', height: '15px' }}
            />
          </label>
        </div>
      </div>

      {/* Tabela de Itens em Andamento */}
      <div className="tabela-itens-em-andamento">
        {itensEmAndamento.length > 0 ? (
          <table>
            <thead>
              <tr className='tr1'>
                <th>Id</th>
                <th>Qde</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {itensEmAndamento.map((item) => (
                <tr key={item.id}>
                  <td data-label="Id">{item.idProduto}</td>
                  <td data-label="Quantidade">{item.totalQuantidade}</td>
                  <td data-label="Nome do Produto">{item.nomeProduto}</td>
                  <td data-label="Preco">{item.totalPrecoUnitario.toFixed(2)}</td>
                  <td data-label="Subtotal">{item.totalSubtotal.toFixed(2)}</td>
                </tr>
              ))}


              {/* Adicionar uma linha para mostrar os totais */}
              <tr>
                <td colSpan="4" style={{ textAlign: 'right' }}>Total dos Subtotais:</td>
                <td>{totais.totalSubtotal.toFixed(2)}</td>

              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right' }}>Comissão (10%):</td>
                <td>{totais.comissao.toFixed(2)}</td>

              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right' }}>Total Geral:</td>
                <td>{totais.totalGeral.toFixed(2)}</td>

              </tr>

            </tbody>
            <br />





          </table>

        ) : (
          <p>Nenhum item encontrado.</p>
        )}

      </div>

      <button onClick={atualizarStatusParaPago}>Pago</button>
      <br />      <br />

      <button ><a href="/desktop" >Voltar</a></button>

    </div>

  );
}

export default ContaCliente;


/*


*/