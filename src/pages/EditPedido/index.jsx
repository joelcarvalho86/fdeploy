import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editPedido, getPedido } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto
import './EditPedido.css';

function EditPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({
    id: '',
    mesaId: '',
    funcionarioId: '',
    Mensagem: '',
    dataHora: '',
    status: '',
  });

  const [itensPedido, setItensPedido] = useState([]);

  useEffect(() => {
    buscaPedido(id);
  }, []);

  const buscaPedido = async (id) => {
    const pedidoDados = await (await getPedido(id)).data;
    setPedido(pedidoDados);
    setItensPedido(pedidoDados.itensPedido); // Certifique-se de ajustar o nome real da propriedade de itensPedido
  };

  const handleChangePedido = (event) => {
    const { name, value } = event.target;
    setPedido((pedidoAnterior) => ({
      ...pedidoAnterior,
      [name]: value,
    }));
  };

  const handleChangeItemPedido = (index, event) => {
    const { name, value } = event.target;
    const novosItensPedido = [...itensPedido];
    novosItensPedido[index] = {
      ...novosItensPedido[index],
      [name]: value,
    };
    setItensPedido(novosItensPedido);
  };

  const editarPedido = async (event) => {
    event.preventDefault();
    console.log({ pedido, itensPedido });
    // Lógica para salvar as alterações do pedido e dos itens do pedido
    await editPedido({ pedido, itensPedido });
    alert('As alterações foram realizadas com sucesso!');
    navigate('/view'); // Altere para a página desejada após a edição
  };

  return (
    <>
      <div className="form-container">
        <h1>Alterar Pedido</h1>
        <form onSubmit={editarPedido}>
          <div className="form-group">
            <label htmlFor="id">ID do Pedido</label>
            <input type="text" id="id" name="id" value={pedido.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="mesaId">ID da Mesa</label>
            <input
              type="text"
              id="mesaId"
              name="mesaId"
              value={pedido.mesaId}
              onChange={handleChangePedido}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="funcionarioId">ID do Funcionário</label>
            <input
              type="text"
              id="funcionarioId"
              name="funcionarioId"
              value={pedido.funcionarioId}
              onChange={handleChangePedido}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Mensagem">Mensagem</label>
            <input
              type="text"
              id="Mensagem"
              name="Mensagem"
              value={pedido.Mensagem}
              onChange={handleChangePedido}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataHora">Data e Hora</label>
            <input
              type="text"
              id="dataHora"
              name="dataHora"
              value={pedido.dataHora}
              onChange={handleChangePedido}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={pedido.status}
              onChange={handleChangePedido}
              required
            />
          </div>

          <h2>Itens do Pedido</h2>
          {itensPedido.map((item, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor={`quantidade-${index}`}>Quantidade</label>
                <input
                  type="text"
                  id={`quantidade-${index}`}
                  name="quantidade"
                  value={item.quantidade}
                  onChange={(e) => handleChangeItemPedido(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`precoUnitario-${index}`}>Preço Unitário</label>
                <input
                  type="text"
                  id={`precoUnitario-${index}`}
                  name="precoUnitario"
                  value={item.precoUnitario}
                  onChange={(e) => handleChangeItemPedido(index, e)}
                  required
                />
              </div>
              {/* Adicione outros campos dos itens do pedido conforme necessário */}
            </div>
          ))}

          <button type="submit">Atualizar Pedido</button>
        </form>
      </div>
    </>
  );
}

export default EditPedido;
