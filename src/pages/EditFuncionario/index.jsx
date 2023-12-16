import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editFuncionario, getFuncionario } from '../../services/funcionario-requests';
import './EditFuncionario.css';

function EditFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState({
    id: '',
    nome: '',
    idade: '',
    email: '',
    username: '', 
    senha: '',   
  });

  useEffect(() => {
    buscaFuncionario(id);
  }, []);

  const buscaFuncionario = async (id) => {
    const funcionarioDados = await (await getFuncionario(id)).data;
    setFuncionario(funcionarioDados);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFuncionario((funcionarioAnterior) => ({
      ...funcionarioAnterior,
      [name]: value,
    }));
  };
  const editarFuncionario = async (event) => {
    event.preventDefault();
    console.log(funcionario);
    await editFuncionario(funcionario);
    alert("As alterações foram realizada com sucesso!");
    navigate('/view');
  };

  return (
    <>
      <div className="form-container">
      <h1>Alterar Funcionario</h1>
        <form onSubmit={editarFuncionario}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={funcionario.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={funcionario.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade</label>
            <input
              type="text"
              id="idade"
              name="idade"
              value={funcionario.idade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={funcionario.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={funcionario.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={funcionario.senha}
              onChange={handleChange}
              required
            />
          </div>

            <button type="submit">Atualizar Funcionario</button>
       
        </form>
      </div>
    </>
  );
}
//<button onClick={() => navigate('/home')}>Voltar à Página Inicial</button>
// <div className="button-container">

export default EditFuncionario;
