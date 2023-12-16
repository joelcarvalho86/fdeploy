// pages/Home/index.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  /* const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Atualiza o relógio a cada segundo
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);
*/
  function teste() {
   //alert(localStorage.getItem('isLoggedIn'));
   //alert(localStorage.getItem('username'));
  }
  return (
    <div>
      <div className="banner">
        <h1>Bem-vindo ao Sistema de Gestão</h1>
        <p>Gerencie seus funcionarios de forma fácil e eficiente.</p>

      </div>

      <div className="actions">
        <img src="/4yBAzK.jpg" alt="Imagem de boas-vindas" />
      </div>

      <div className="rodape" >
        <a href="/sobre" margin='5px'>Sobre</a>&nbsp; &nbsp;
        <a href="/contato" text-align='center' >Contato</a>&nbsp; &nbsp;
        <a href="/termos">Termos de Uso</a>&nbsp; &nbsp;
        <a href="/priv">Política de Privacidade</a>&nbsp; &nbsp;
        <a href="#"></a>&nbsp; &nbsp;
        <p>Copyright© 2023</p>
      </div>

    </div>


  );
}
/*

  <button onClick={teste}>OK</button>
        
     <div className="clock-container">
          <div className="clock">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}:{currentTime.getMilliseconds()}
             &nbsp;&nbsp;
              {currentTime.toLocaleDateString()}
          </div>
        </div>


<div className="actions">
        <Link to="/funcionario/">
          <button>Cadastrar Novo Funcionario</button>
        </Link>
        <Link to="/funcionario/view">
          <button>Visualizar Funcionarios</button>
        </Link>
      </div>
*/
export default Home;
