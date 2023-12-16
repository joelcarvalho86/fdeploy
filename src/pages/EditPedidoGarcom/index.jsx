import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editPedidoGarcom, getPedidoGarcom } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto
import './EditPedidoGarcom.css';

function EditPedidoGarcom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedidoGarcom, setPedidoGarcom] = useState({
    id: '',
    produtoId: '',
    quantidade: '',
    Mensagem: '',
    dataHora: '',
  });

  useEffect(() => {
    buscaPedidoGarcom(id);
  }, []);

  const buscaPedidoGarcom = async (id) => {
    const pedidoGarcomDados = await (await getPedidoGarcom(id)).data;
    setPedidoGarcom(pedidoGarcomDados);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPedidoGarcom((pedidoGarcomAnterior) => ({
      ...pedidoGarcomAnterior,
      [name]: value,
    }));
  };

  const editarPedidoGarcom = async (event) => {
    event.preventDefault();
    console.log(pedidoGarcom);
    await editPedidoGarcom(pedidoGarcom);
    alert('As alterações foram realizadas com sucesso!');
    navigate('/view'); // Altere para a página desejada após a edição
  };

  return (
    <>
      <div className="form-container">
        <h1>Alterar Pedido Garçom</h1>
        <form onSubmit={editarPedidoGarcom}>
          <div className="form-group">
            <label htmlFor="id">ID do Pedido Garçom</label>
            <input type="text" id="id" name="id" value={pedidoGarcom.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="produtoId">ID do Produto</label>
            <input
              type="text"
              id="produtoId"
              name="produtoId"
              value={pedidoGarcom.produtoId}
              onChange={handleChange}
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
              required
            />
          </div>

          <button type="submit">Atualizar Pedido Garçom</button>
        </form>
      </div>
    </>
  );
}

export default EditPedidoGarcom;
