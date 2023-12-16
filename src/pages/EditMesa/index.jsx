import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editMesa, getMesa } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto
import './EditMesa.css';

function EditMesa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mesa, setMesa] = useState({
    id: '',
    funcionarioId: '',
    status: '',
  });

  useEffect(() => {
    buscaMesa(id);
  }, []);

  const buscaMesa = async (id) => {
    const mesaDados = await (await getMesa(id)).data;
    setMesa(mesaDados);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMesa((mesaAnterior) => ({
      ...mesaAnterior,
      [name]: value,
    }));
  };

  const editarMesa = async (event) => {
    event.preventDefault();
    console.log(mesa);
    await editMesa(mesa);
    alert('As alterações foram realizadas com sucesso!');
    navigate('/view'); // Altere para a página desejada após a edição
  };

  return (
    <>
      <div className="form-container">
        <h1>Alterar Mesa</h1>
        <form onSubmit={editarMesa}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={mesa.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="funcionarioId">ID do Funcionário</label>
            <input
              type="text"
              id="funcionarioId"
              name="funcionarioId"
              value={mesa.funcionarioId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={mesa.status}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Atualizar Mesa</button>
        </form>
      </div>
    </>
  );
}

export default EditMesa;
