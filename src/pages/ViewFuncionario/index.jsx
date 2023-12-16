import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ViewFuncionario.css';
import { getFuncionarios, removeFuncionario } from '../../services/funcionario-requests';

function ViewFuncionario() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    carregaFuncionarios();
  }, [funcionarios]);

  const carregaFuncionarios = async () => {
    const funcionariosResponse = await getFuncionarios();
    setFuncionarios(await funcionariosResponse.data);
  };

  const deleteFuncionario = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar este usuário?");

    if (confirmacao) {
      const confirmacao1 = window.confirm("Pense bem, tem realmente certeza disso?");

      if (confirmacao1) {
        const confirmacao2 = window.confirm("Rapaz... Cuidado!");

        if (confirmacao2) {
          alert("Usuário deletado!");
          await removeFuncionario(id);
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
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Username</th>
            <th>ID Função</th>
            <th>Função</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td data-label="ID">{funcionario.id}</td>
              <td data-label="Nome">{funcionario.nome}</td>
              <td data-label="Idade">{funcionario.idade}</td>
              <td data-label="Email">{funcionario.email}</td>
              <td data-label="Username">{funcionario.username}</td>
              <td data-label="ID Função">{funcionario.idfuncao}</td>
              <td data-label="Função">{funcionario.funcao}</td>
              <td data-label="Status">{funcionario.status}</td>
             
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

export default ViewFuncionario;


/*
            <th>Ações</th>
 <td>
                <Link to={`../edit/${encodeURIComponent(funcionario.id)}`}>
                  <button style={{ marginRight: '5px' }}>
                    <FaEdit />
                  </button>
                </Link>

                <button onClick={() => deleteFuncionario(funcionario.id)}>
                  <FaTrash />
                </button>
              </td>
*/