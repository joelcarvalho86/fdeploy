// pages/AddPedido/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMesas, addPedido, addItemPedido, getProduto, getProdutos } from '../../services/funcionario-requests';
import './addPedido.css';
import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';


function AddPedido() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [produtosPesquisados, setProdutosPesquisados] = useState([]);
  const [selectedProdutoDetails, setSelectedProdutoDetails] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [tempItensPedido, setTempItensPedido] = useState([]);
  const [isSavingPedido, setIsSavingPedido] = useState(false);

  const [pedido, setPedido] = useState({
    mesaId: '',
    funcionarioId: '', // Adicione o id do funcionário diretamente
    mensagem: '',
    status: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [itemPedido, setItemPedido] = useState({
    produtoId: '',
    quantidade: '',
    precoUnitario: 0,
    subtotal: 0,
    pedidoId: '',
  });

  const [funcionario, setFuncionario] = useState({
    id: '',
    nome: '',
    idade: '',
    email: '',
    username: '',
    senha: '',
  });

  const handleAddItemPedido = async () => {
    try {
      // Validar se a mesa foi escolhida
      if (!pedido.mesaId) {
        alert('Por favor, escolha uma mesa.');
        return;
      }

      // Se o campo produtoId estiver vazio, exibir mensagem de alerta
      if (!itemPedido.produtoId) {
        alert('Por favor, escolha um produto antes de adicionar ao pedido.');
        return;
      }

      // Se não houver produto selecionado, não adiciona o item
      if (!selectedProduto) {
        alert('Por favor, selecione um produto antes de adicionar ao pedido.');
        return;
      }

      // Criar um novo item de pedido
      const novoItemPedido = {
        produtoId: selectedProdutoDetails?.id,
        quantidade: quantity,
        precoUnitario: selectedProdutoDetails?.preco || 0,
        subtotal: quantity * (selectedProdutoDetails?.preco || 0),
        nomeProduto: selectedProduto.label, // Adiciona o nome do produto ao novoItemPedido
      };

      // Atualizar o estado dos itens temporários do pedido
      setTempItensPedido((tempItensAnteriores) => [...tempItensAnteriores, novoItemPedido]);

      // Limpar os campos após adicionar o item ao pedido
      clearFields();

      // Exibir a mensagem de sucesso
      setShowSuccessMessage(true);

      // Ocultar a mensagem após alguns segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

    } catch (error) {
      console.error('Erro ao adicionar item do pedido:', error);
    }
  };



  // Quando o pedido é salvo
  const handleSalvarPedido = async () => {
    try {

      // Validar se há itens no pedido
      if (tempItensPedido.length === 0) {
        alert('Adicione pelo menos um item ao pedido antes de salvar.');
        return;
      }
      //alert(localStorage.getItem('nome') + "<>" + localStorage.getItem('idfunclogin'));
      // Criar um novo pedido
      setIsSavingPedido(true); // Desativa o botão de salvar

      const novoPedido = await addPedido({
        ...pedido,
        funcionarioId: localStorage.getItem('idfunclogin'),
        status: 'Em Andamento',
      });

      // Atualizar os itens do pedido com o ID do pedido
      const itensPedidoComIdPedido = tempItensPedido.map((item) => ({
        ...item,
        status: 'Em Andamento',
        pedidoId: novoPedido.id,
      }));

      // Salvar os itens do pedido
      await Promise.all(itensPedidoComIdPedido.map(addItemPedido));

      // Atualizar o estado permanente dos itens do pedido
      setItensPedido(tempItensPedido);

      // Limpar os itens temporários do pedido
      setTempItensPedido([]);

      alert('Pedido e itens do pedido salvos!');
      setIsSavingPedido(false); // Ativa o botão de salvar

    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };


  const handleRemoverItemPedido = (index) => {
    // Remover um item do pedido
    const novosItensPedido = [...tempItensPedido];
    novosItensPedido.splice(index, 1);

    // Atualizar o estado dos itens temporários do pedido
    setTempItensPedido(novosItensPedido);
  };

  const clearFields = () => {
    setTermoPesquisa('');
    setProdutosPesquisados([]);
    setQuantity(1);
    setSelectedProduto(null);
    setSelectedProdutoDetails(null);
    setItemPedido({
      produtoId: '',
      quantidade: '',
      precoUnitario: 0,
      subtotal: 0,
      pedidoId: '',
    });

  };

  const clearFields2 = () => {
    setTermoPesquisa('');
    setProdutosPesquisados([]);
    setQuantity(1);
    setSelectedProduto(null);
    setSelectedProdutoDetails(null);
    setTempItensPedido([]);
    setItemPedido({
      produtoId: '',
      quantidade: '',
      precoUnitario: 0,
      subtotal: 0,
      pedidoId: '',
    });
  };

  const [mesas, setMesas] = useState([]);


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
  }, []); // O segundo parâmetro é um array vazio para garantir que isso só seja executado na montagem do componente

  const handlePesquisaProduto = async () => {
    try {
      const produtosResponse = await getProdutos();
      const produtosFiltrados = produtosResponse.data.filter((produto) =>
        produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
      const produtosOptions = produtosFiltrados.map((produto) => ({
        value: produto.id,
        label: produto.nome,
      }));

      setProdutosPesquisados(produtosOptions);

      // Se houver apenas um produto correspondente, selecioná-lo automaticamente
      if (produtosOptions.length === 1) {
        setSelectedProduto(produtosOptions[0]);
        handleProdutoSelecionado(produtosOptions[0].value); // Chamada da função para tratar produto selecionado
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleProdutoSelecionado = async (produtoId) => {

    try {
      const produtoDetailsResponse = await getProduto(produtoId);
      const produtoDetails = produtoDetailsResponse.data;

      // Atualizar os estados com os detalhes do produto
      setItemPedido((itemPedidoAnterior) => ({
        ...itemPedidoAnterior,
        produtoId: produtoDetails.id,
        nomeProduto: produtoDetails.nome, // Adicionar o nome do produto
        precoUnitario: produtoDetails.preco,
        subtotal: quantity * produtoDetails.preco,
        status: "Em Andamento",
      }));

      // Atualizar o estado selectedProdutoDetails
      setSelectedProdutoDetails(produtoDetails);
      //alert("-->"+produtoDetails.preco);
    } catch (error) {
      console.error('Erro ao buscar detalhes do produto:', error);
    }
  };

  const handleChangePedido = (event) => {
    const { name, value } = event.target;

    // Validar se o valor contém apenas números
    if (name === 'mesaId' && !/^\d*$/.test(value)) {
      alert('Por favor, insira apenas números para a mesa.');
      return;
    }
    // Validar se há itens no pedido antes de permitir a mudança da mesa
    if (tempItensPedido.length > 0) {
      alert('Não é permitido mudar a mesa quando há itens no pedido.');
      return;
    }
    setPedido((pedidoAnterior) => ({
      ...pedidoAnterior,
      [name]: value,
    }));
  };


  const handleChangeItemPedido = (event) => {
    const { name, value } = event.target;
    setItemPedido((itemPedidoAnterior) => ({
      ...itemPedidoAnterior,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProdutoDetails = async () => {
      // Inicializar com o produto selecionado ao carregar a tela
      if (selectedProduto) {
        try {
          const produtoDetailsResponse = await getProduto(selectedProduto.value);
          const produtoDetails = produtoDetailsResponse.data;

          setSelectedProdutoDe
          setSelectedProdutoDetails(produtoDetails);
        } catch (error) {
          console.error('Error fetching produto details:', error);
        }
      }
    };

    fetchProdutoDetails();
  }, []);

  const fetchProdutoDetails = async () => {
    if (selectedProduto) {
      try {
        const produtoDetailsResponse = await getProduto(selectedProduto.value);
        const produtoDetails = produtoDetailsResponse.data;

        console.log('Produto Details:', produtoDetails);

        setSelectedProdutoDetails(produtoDetails);
      } catch (error) {
        console.error('Error fetching produto details:', error);
      }
    }
  };

  const handleProdutoIdChange = async (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Permitir apenas números positivos

    // Atualizar o estado com o ID do produto inserido manualmente
    setItemPedido((itemPedidoAnterior) => ({
      ...itemPedidoAnterior,
      produtoId: inputValue,
    }));

    // Atualizar o estado produtosPesquisados para selecionar o produto
    try {
      const produtoDetailsResponse = await getProduto(inputValue);
      const produtoDetails = produtoDetailsResponse.data;

      setSelectedProdutoDetails(produtoDetails);

      // Atualizar o estado produtosPesquisados para selecionar o produto
      setProdutosPesquisados([
        {
          value: produtoDetails.id,
          label: produtoDetails.nome,
        },
      ]);

      // Atualizar o estado selectedProduto para exibir o produto no Select
      setSelectedProduto({
        value: produtoDetails.id,
        label: produtoDetails.nome,
        precoUnitario: produtoDetails.preco,
      });

    } catch (error) {
      console.error('Error fetching produto details:', error);
      // Adicionar um tratamento para o caso em que o produto não é encontrado
      setSelectedProduto(null);
      setSelectedProdutoDetails(null);
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Atualize o estado do item do pedido com o novo valor
    setItemPedido((itemPedidoAnterior) => ({
      ...itemPedidoAnterior,
      [name]: value,
    }));

    // Atualize o subtotal com base na quantidade e preço unitário
    const quantidade = name === 'quantidade' ? value : itemPedido.quantidade;
    const precoUnitario = name === 'precoUnitario' ? value : itemPedido.precoUnitario;

    const novoSubtotal = parseFloat(quantidade) * parseFloat(precoUnitario);
    setItemPedido((itemPedidoAnterior) => ({
      ...itemPedidoAnterior,
      subtotal: isNaN(novoSubtotal) ? '' : novoSubtotal.toFixed(2),
    }));
  };


  //########################################################################################################

  return (
    <div className="form-container">
      <h1>Novo Pedido</h1>
      <form autoComplete="off">

        {/* Adicionar campos ocultos para ItemPedido */}
        <input type="hidden" id="pedidoId" name="pedidoId" value={pedido.id} />
        <input type="hidden" id="precoUnitario" name="precoUnitario" value={selectedProdutoDetails?.preco || 0} />
        {/* Adicionar campos ocultos para ItemPedido */}
        <input type="hidden" id="produtoId" name="produtoId" value={itemPedido.produtoId} />
        <input type="hidden" id="quantidade" name="quantidade" value={itemPedido.quantidade} />
        <input type="hidden" id="precoUnitario" name="precoUnitario" value={itemPedido.precoUnitario} />
        <input type="hidden" id="subtotal" name="subtotal" value={itemPedido.subtotal} />
        <input type="hidden" id="status" name="subtotal" value={itemPedido.status} />


        <div className="garcom-label">

          <label htmlFor="mesaId">Mesa:</label>
          {<select
            id="mesaId"
            name="mesaId"
            value={pedido.mesaId}
            onChange={handleChangePedido}
            style={{ width: '100px', height: '30px', fontSize: '1.6em' }}
            required
          >
            <option value="">Mesa</option>
            {mesas.map((mesa) => (
              <option key={mesa.id}>
                {mesa.id}
              </option>
            ))}
          </select>}
          <input type="hidden" id="funcionarioId" name="funcionarioId" value={localStorage.getItem('idfunclogin')} />
          <label>Garçom: {localStorage.getItem('nome')}</label>
        </div>

        {/* Campos para adicionar itemPedido -- value={mesa.id} */}
        <h2>Adicionar Item ao Pedido</h2>
        <div className="garcom-label1">
          <div className="label-input-group">
            <label htmlFor="produtoId">Cód. Produto</label>
            <input
              type="text"
              id="produtoId"
              name="produtoId"
              value={itemPedido.produtoId}
              onChange={handleProdutoIdChange}
              autoComplete="off"
              pattern="[1-9]\d*" // Enforces positive integers
              required
            />
          </div>
          <div className="label-input-group">
            <label htmlFor="quantidade">Quantidade</label>
            <div className="counter-input">
              <button type="button" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
              <input
                type="text"
                id="quantidade"
                name="quantidade"
                value={quantity}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                -
              </button>
            </div>
          </div>
        </div>
        {
          selectedProduto ? (
            <div className='J1' style={{ width: '100%', marginRight: '10px', fontSize: '1.6em' }}>
              <label>Item Selecionado:</label>
              {selectedProduto.label}
            </div>
          ) : (
            <div className='J1' style={{ width: '100%', fontSize: '1.6em' }} >
              {/* Dropdown de produtos */}
              {
                <Select
                  options={produtosPesquisados}
                  onChange={(selectedOption) => {
                    setSelectedProduto(selectedOption);
                    handleProdutoSelecionado(selectedOption.value);
                  }}
                  onInputChange={(inputValue) => {
                    setTermoPesquisa(inputValue);
                    handlePesquisaProduto();
                  }}
                  placeholder="Selecione um produto"
                  isClearable

                />

              }
            </div>
          )
        }

        <div className="form-group price-group">
          <label htmlFor="precoUnitario" className="price-label">P.Unit.:</label>
          <input
            type="text"
            id="precoUnitario"
            name="precoUnitario"
            value={selectedProdutoDetails?.preco.toFixed(2) || ''}
            readOnly
            autoComplete="off"
            required
          />

          <label htmlFor="subtotal">Subtotal:</label>
          <input
            type="text"
            id="subtotal"
            name="subtotal"
            value={(quantity * selectedProdutoDetails?.preco).toFixed(2) || ''} //(quantity * pricePerUnit).toFixed(2)} // Calculate the subtotal based on quantity and price per unit
            readOnly
            autoComplete="off"
            required
          />
        </div>
        <button type="button" onClick={handleAddItemPedido}>
          Adicionar Item
        </button>

        {showSuccessMessage && <p>Item do pedido adicionado com sucesso!</p>}
        <div className="table-container">
          {tempItensPedido.length > 0 && (
            <table >
              <thead>
                <tr>
                  <th>Cód</th>
                  <th>Qtd</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Subtotal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {tempItensPedido.map((item, index) => (
                  <tr key={index}>
                    <td>{item.produtoId}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.nomeProduto}</td> {/* Nome do produto */}
                    <td>{item.precoUnitario.toFixed(2)}</td>
                    <td>{item.subtotal.toFixed(2)}</td>
                    <td>
                      <button type="button" onClick={() => handleRemoverItemPedido(index)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
        <br />
        <button type="button" onClick={clearFields2}>
          Limpar Campos
        </button>
        <br />
        <button type="button" onClick={handleSalvarPedido} disabled={isSavingPedido}>
          Salvar Pedido
        </button>
        <br />

      </form >
      <button><a href="/viewpedidos" >Ver Pedidos</a></button>
      <br />
      <br />
      <button><a href="/desktop" >Voltar</a></button>
    </div >
  );
}

export default AddPedido;

/*{pedido.produtoId}*/