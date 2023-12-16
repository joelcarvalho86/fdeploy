// pages/AddFuncionario/index.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFuncionario } from '../../services/funcionario-requests';
import './addFuncionario.css';


function AddFuncionario() {
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState({
    nome: '',
    idade: '',
    idfuncao: '',
    funcao: '',
    email: '',
    username: '',
    senha: '',
    status: ''
  });

  /* useEffect(() => {
     // Limpar os campos quando a página carregar
     document.getElementById('username_login').value = '';
     document.getElementById('senha_login').value = '';
   }, []);*/

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFuncionario((funcionarioAnterior) => ({
      ...funcionarioAnterior,
      [name]: value,
    }));
  };

  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [senhaCompara, setSenhaCompara] = useState('');

  const handleFuncaoChange = (event) => {
    const { value, selectedIndex } = event.target;
    const idfuncao = event.target.options[selectedIndex].getAttribute('data-idfuncao');
    setFuncionario((funcionarioAnterior) => ({
      ...funcionarioAnterior,
      idfuncao,
      funcao: value,
    }));
  };
  
  const handleCheckboxChange = () => {
    setAceitarTermos(!aceitarTermos);
  };

  const handleCreateAccountClick = () => {
    // Limpar os campos do formulário
    setFuncionario({
      nome: '',
      idade: '',
      idfuncao: '',
      funcao: '',
      email: '',
      username: '',
      senha: '',
      status: ''
    });
    setSenhaCompara('');
  }

  const handleSenhaComparaChange = (event) => {
    const { value } = event.target;
    setSenhaCompara(value);
  };

  const salvaFuncionario = async (event) => {
    event.preventDefault();

    if (aceitarTermos) {
      // Verificar se a senha e a confirmação de senha coincidem
      if (funcionario.senha === senhaCompara) {
        // Realizar a lógica para salvar o funcionario
        await addFuncionario(funcionario);
        alert('Funcionario salvo!');
        navigate('/');
      } else {
        alert('A senha e a confirmação de senha não coincidem. Por favor, tente novamente.');
      }
    } else {
      alert('Você deve aceitar os termos para enviar o formulário.');
    }
  };

  return (
    <div className="form-container">
      <h1>Novo Funcionario</h1>
      <form onSubmit={salvaFuncionario} autoComplete="off">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={funcionario.nome}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="funcao">Função</label>
          <select
            id="funcao"
            name="funcao"
            value={funcionario.funcao}
            onChange={handleFuncaoChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="Dono" data-idfuncao="1">
              Dono
            </option>
            <option value="Gerente" data-idfuncao="2">
              Gerente
            </option>
            <option value="Cozinheira" data-idfuncao="3">
              Cozinheira
            </option>
            <option value="Garçom" data-idfuncao="4">
              Garçom
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={funcionario.status}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="1">Ativo</option>
            <option value="0">Inativo</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="idade">Idade</label>
          <input
            type="text"
            id="idade"
            name="idade"
            value={funcionario.idade}
            onChange={handleChange}
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
            inputMode="numeric" // Isso pode ajudar a evitar o preenchimento automático
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha_compara">Confirmação de senha</label>
          <input
            type="password"
            id="senha_compara"
            name="senha_compara"
            value={senhaCompara}
            onChange={handleSenhaComparaChange}
            autoComplete="new-password"
            required
          />
        </div>
        <br />
        <div className="button-container">
          <button><a href="/desktop" className="garcom-button">Voltar</a></button>
        </div>
        <br />
        <button type="submit">Salvar</button>
        <br></br>
      </form>
      <button className="button-b" onClick={handleCreateAccountClick}>Limpar</button>

    </div>
  );
}
// <button onClick={() => navigate('/home')}> Home </button>
// <div className="button-container"></ div>
export default AddFuncionario;


/*
<div className="terms-container">
          <input name="accept_terms"
            id="accept_terms"
            type="checkbox"
            checked={aceitarTermos}
            onChange={handleCheckboxChange}
            className="terms-checkbox"
            required
          />

          Eu concordo com os <a href="/termos" target="_blank">Termos de Uso</a>
          <p></p> <p></p> <p></p> <p></p> <p></p>
        </div>
        <div className="terms-container"> Declaro veracidade das informações fornecidas, sob pena de sanções administrativas, civis e penais aplicáveis.</div>
        <br></br>

      <button className="button-b"><a className="button-b" href="/">Fazer o Login</a></button>

*/