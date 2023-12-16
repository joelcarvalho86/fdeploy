import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ViewMesa.css'; // Certifique-se de criar o arquivo de estilo ViewMesa.css
import { getMesas, removeMesa } from '../../services/funcionario-requests'; // Certifique-se de importar o serviço correto

function ViewMesa() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    carregaMesas();
  }, [mesas]);

  const carregaMesas = async () => {
    const mesasResponse = await getMesas();
    setMesas(await mesasResponse.data);
  };

  const deleteMesa = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar esta mesa?");

    if (confirmacao) {
      const confirmacao1 = window.confirm("Pense bem, tem realmente certeza disso?");

      if (confirmacao1) {
        const confirmacao2 = window.confirm("Rapaz... Cuidado!");

        if (confirmacao2) {
          alert("Mesa deletada!");
          await removeMesa(id);
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
            <th>ID do Funcionário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id}>
              <td data-label="ID">{mesa.id}</td>
              <td data-label="ID do Funcionário">{mesa.funcionarioId}</td>
              <td data-label="Status">{mesa.status}</td>
              <td>
                <Link to={`../edit/${encodeURIComponent(mesa.id)}`}>
                  <button style={{ marginRight: '5px' }}>
                    <FaEdit />
                  </button>
                </Link>

                <button onClick={() => deleteMesa(mesa.id)}>
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

export default ViewMesa;
