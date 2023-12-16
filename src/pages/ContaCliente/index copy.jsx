import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './ContaCliente.css';
import { getItensPorMesa, atualizarStatusPago, getMesas, getItensPorMesaDetalhado } from '../../services/funcionario-requests';

function ContaCliente() {
  const [itensEmAndamento, setItensEmAndamento] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [mesaId, setMesaId] = useState('');
  const [contaDetalhada, setContaDetalhada] = useState(false); // Novo estado

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

  /*useEffect(() => {
    carregaItens();
  }, [mesaId]); // Adicione mesaId como dependência para recarregar itens quando a mesa mudar*/

  const handleChangePedido = (event) => {
    const { name, value } = event.target;

    if (name === 'mesaId' && !/^\d*$/.test(value)) {
      alert('Por favor, insira apenas números para a mesa.');
      return;
    }

    setMesaId(value);
    carregaItens();
  };


  /*useEffect(() => {
   

    carregaItens();
  }, []);*/

  const carregaItens = async () => {
    try {
      let itensPorMesaResponse;

      //if (contaDetalhada && mesaId) {
     //   itensPorMesaResponse = await getItensPorMesaDetalhado(mesaId); // Chame a função sem passar o ID da mesa
     // } else {
        itensPorMesaResponse = await getItensPorMesa(mesaId);
         const itens = itensPorMesaResponse.data;
         alert(JSON.stringify(itens, null, 2)); // Converte para uma string JSON formatada

    //  }

      setItensEmAndamento(await itensPorMesaResponse.data);

      //alert('Itens por Mesa Response: ${itensPorMesaResponse}', itensPorMesaResponse.data);
      //alert(`ViewPedidos - Erro ao entregar o item: ${error.message}`);
      //alert(`ViewPedidos - Erro ao entregar o item: ${itensPorMesaResponse.data}`);
     // alert(`ViewPedidos - Erro ao entregar o item:`);

      /*const itens = await itensPorMesaResponse.data;

      // Calcular totais
      const totalSubtotal = itens.reduce((acc, item) => acc + item.totalSubtotal, 0);
      const comissao = totalSubtotal * 0.1;
      const totalGeral = totalSubtotal + comissao;

      setItensEmAndamento(itens);
      setTotais({ totalSubtotal, comissao, totalGeral });*/


      //setItensEmAndamento(await itensPorMesaResponse.data);
    } catch (error) {
      alert(JSON.stringify(error, null, 2)); // Converte para uma string JSON formatada
      console.error('Erro ao carregar itens:', error);
    }
  };


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
   <div className="view-container">
      <div className="mesa-selector">
        <label htmlFor="mesaId">Selecione uma mesa: </label>
        <select name="mesaId" value={mesaId} onChange={handleChangePedido}>
          <option value="">Selecione uma mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              {mesa.id}
            </option>
          ))}
        </select>
        <label>Garçom: {localStorage.getItem('nome')}</label>
        {/* Adicione um checkbox para alternar entre conta detalhada e agrupada */}
        <div className="checkbox-container">
          <label>
            Conta Detalhada
            <input
              type="checkbox"
              checked={contaDetalhada}
              onChange={() => setContaDetalhada(!contaDetalhada)}
            />
          </label>
        </div>
      </div>

  {/*} Tabela de Itens em Andamento */}
      <div className="tabela-itens-em-andamento">
      <h2>Conta do Cliente</h2>
        <table>
        <thead>
            <tr className='tr1'>
              <th>Id</th>
              <th>Quantidade</th>
              <th>Nome do Produto</th>
              <th>Preço</th>
              <th>Subtotal</th>
              <th>Cancelar</th>
            </tr>
          </thead>
             <tbody>
            {itensEmAndamento.map((item) => (
              <tr key={item.id}>
                <td data-label="Id">{item.id}</td>
                <td data-label="Quantidade">{item.totalQuantidade}</td>
                <td data-label="Nome do Produto">{item.produto.nome}</td>
                <td data-label="Preco">{item.totalPrecoUnitario}</td>
                <td data-label="Subtotal">{item.totalSubtotal}</td>
                <td data-label="Cancelar">
                  <button onClick={() => cancelarItemPedido(item.id)}>
                    <FaCheck />
                  </button>
                 </td>
              </tr>




            ))}
            {/* {// Adicionar uma linha para mostrar os totais }
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}>Total dos Subtotais:</td>
              <td>{totais.totalSubtotal}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}>Comissão (10%):</td>
              <td>{totais.comissao}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}>Total Geral:</td>
              <td>{totais.totalGeral}</td>
              <td></td>
            </tr>*/}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button onClick={atualizarStatusParaPago}>Atualizar Status para Pago</button>
        <a href="/desktop" className="garcom-button">Voltar</a>
      </div>
    </div>
  
  );
}

export default ContaCliente;


/*

/*

exports.getItensPorMesa = (req, res) => {
	ItemPedido.findAll({ 
        attributes: [
            'id',
            ['status', 'nome'],
            ['quantidade', 'totalQuantidade'],
            ['precoUnitario', 'totalPrecoUnitario'],
            ['subtotal', 'totalSubtotal']
        ]
    })
		.then(itensPedidos => {
            console.log(itensPedidos); // Log the results
			res.status(200).json(itensPedidos);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "Erro!",
				error: error
			});
		});
}



exports.getItensPorMesa = (req, res) => {
  const mesaId = req.params.mesaId; // Assumindo que você está passando o ID da mesa nos parâmetros da solicitação

  ItemPedido.findAll({
    attributes: [
      'Produto.id',
      'Produto.nome',
      [Sequelize.fn('SUM', Sequelize.literal('quantidade')), 'totalQuantidade'],
      [Sequelize.fn('SUM', Sequelize.literal('precoUnitario')), 'totalPrecoUnitario'],
      [Sequelize.fn('SUM', Sequelize.literal('subtotal')), 'totalSubtotal']
    ],
    where: {
      status: 'Em Andamento',
      '$Pedido.mesaId$': mesaId, // Filtrar por mesaId
    },
    include: [
      {
        model: Produto,
        attributes: [],
      },
      {
        model: Pedido,
        attributes: ['id', 'mesaId', 'funcionarioId', 'mensagem', 'status', 'data'],
        include: [
          {
            model: Funcionario,
            attributes: ['id', 'nome', 'idfuncao', 'funcao', 'idade', 'email', 'username', 'status'],
          },
        ],
      },
    ],
    group: ['Produto.id'],
  })
    .then(itensPedidos => {
      console.log(itensPedidos);
      res.status(200).json(itensPedidos);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Erro!',
        error: error,
      });
    });
};

/*exports.getItensPorMesa = (req, res) => {
    const mesaId = req.params.mesaId;
  
    ItemPedido.findAll({
      attributes: [
        'Produto.id',
        'Produto.nome',
        [Sequelize.fn('SUM', Sequelize.literal('quantidade')), 'totalQuantidade'],
        [Sequelize.fn('SUM', Sequelize.literal('precoUnitario')), 'totalPrecoUnitario'],
        [Sequelize.fn('SUM', Sequelize.literal('subtotal')), 'totalSubtotal'],
      ],
      where: {
        status: 'Em Andamento',
        '$Pedido.mesaId$': mesaId,
      },
      include: [
        {
          model: Produto,
          attributes: ['id', 'nome', 'descricao', 'preco', 'quantidadeEstoque', 'categoriaId', 'status'],
        },
        {
          model: Pedido,
          attributes: ['id', 'mesaId', 'funcionarioId', 'mensagem', 'status', 'data'],
          include: [
            {
              model: Funcionario,
              attributes: ['id', 'nome', 'idfuncao', 'funcao', 'idade', 'email', 'username', 'status'],
            },
          ],
        },
      ],
      group: ['Produto.id'],
    })
      .then(itensPedidos => {
        // Mapeando os resultados para ter uma estrutura mais amigável
        const resultadoFormatado = itensPedidos.map(item => ({
          produtoId: item.Produto.id,
          nomeProduto: item.Produto.nome,
          totalQuantidade: item.get('totalQuantidade'),
          totalPrecoUnitario: item.get('totalPrecoUnitario'),
          totalSubtotal: item.get('totalSubtotal'),
        }));
  
        console.log(resultadoFormatado);
        res.status(200).json(resultadoFormatado);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Erro!',
          error: error,
        });
      });
  };





  */


