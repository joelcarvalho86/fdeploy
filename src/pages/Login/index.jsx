import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../services/funcionario-requests';

function Login({ setLoggedIn, setUsername }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    senha: '',
  });
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);

  /*
  //Funcionalidade de não robo
    const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };*/

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

 // setLoggedIn(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      /*
       //Funcionalidade de não robo
      if (!isChecked) {
        setError('Por favor, confirme que você não é um robô.');
        return;
      }*/
      const response = await login(credentials.username, credentials.senha);
      if (response.ok) {
      
        setLoggedIn(true);
        setUsername(credentials.username);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('idfunclogin', response.funcionario ? response.funcionario.id: '');
        localStorage.setItem('nome', response.funcionario ? response.funcionario.nome : '');
        localStorage.setItem('username', response.funcionario ? response.funcionario.username: '');
        localStorage.setItem('idfuncao', response.funcionario ? response.funcionario.idfuncao : '');
        //alert(response.funcionario.nome+"<>"+response.funcionario.id);
        navigate('/desktop');
      } else {
        const responseData = await response.json();
        setError(responseData.message || 'Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      
      console.error('Erro durante a autenticação:', error);
        // Exibir a mensagem de sucesso
     
      
      setError(true);

      // Ocultar a mensagem após alguns segundos
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="login-background">
      <div className="actions3">
        <img src="/Logoas.JPG" alt="Imagem de boas-vindas" />
      </div>
      <div className="login-container">
        <h1 className="h1-a">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input-login"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="input-login"
              placeholder="Senha"
              value={credentials.senha}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">Ocorreu um erro durante a autenticação. Por favor, tente novamente.</p>}
         

          <button type="submit"   className="button-login">Fazer Login</button>
          <br />     <br />     <br />
        </form>

      
      </div>
    </div>
  );
}

export default Login;


/*

  <div className="actions2">
          <input
            type="checkbox"
            id="recaptchaCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="recaptchaCheckbox">Eu não sou um robô</label>
          <img src="/reCAPTCHA_.JPG" alt="" className="captcha-img" />
          <label>      </label>
        </div>
        <div className='div-a' ><b> <a  href="/add">CRIE A SUA CONTA</a></b></div>
     
<div className="divcaptcha">
<img src="/reCAPTCHA_.JPG" alt="" className="captcha" />
</div>*/

