// pages/AddPedidoGarcom/index.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPedidoGarcom } from '../../services/funcionario-requests'; // Atualize o import conforme necessário
import './addPedidoGarcom.css';

function AddPedidoGarcom() {
  const navigate = useNavigate();
  const [pedidoGarcom, setPedidoGarcom] = useState({
    produtoId: '',
    quantidade: '',
    Mensagem: '',
    dataHora: '',
  });

  useEffect(() => {
    // Lógica para carregar dados necessários, como a lista de produtos, etc.
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPedidoGarcom((pedidoGarcomAnterior) => ({
      ...pedidoGarcomAnterior,
      [name]: value,
    }));
  };

  const handleSalvarPedidoGarcom = async () => {
    // Lógica para salvar o pedidoGarcom
    await addPedidoGarcom(pedidoGarcom);
    alert('PedidoGarcom adicionado!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Novo Pedido Garcom</h1>
      <form autoComplete="off">
        <div className="form-group">
          <label htmlFor="produtoId">Produto ID</label>
          <input
            type="text"
            id="produtoId"
            name="produtoId"
            value={pedidoGarcom.produtoId}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="text"
            id="quantidade"
            name="quantidade"
            value={pedidoGarcom.quantidade}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Mensagem">Mensagem</label>
          <input
            type="text"
            id="Mensagem"
            name="Mensagem"
            value={pedidoGarcom.Mensagem}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataHora">Data e Hora</label>
          <input
            type="text"
            id="dataHora"
            name="dataHora"
            value={pedidoGarcom.dataHora}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <br />
        <br />

        <button type="button" onClick={handleSalvarPedidoGarcom}>
          Salvar Pedido Garcom
        </button>
      </form>
    </div>
  );
}

export default AddPedidoGarcom;
