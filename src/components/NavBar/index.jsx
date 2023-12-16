// components/NavBar/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './estilo.css';


//import { useHistory } from 'react-router-dom';

function NavBar({ cordafonte, isLoggedIn, username, children }) {




  function maior(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Atualiza o relógio a cada segundo
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  //const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);
  //history = useHistory();

  const handleLogout = () => {
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('username');
    window.location.reload();
  };

  function teste() {
    alert(localStorage.getItem('isLoggedIn'));
    alert(localStorage.getItem('username'));
  }



  const isLogin = window.location.pathname === '/';
  const isConta = window.location.pathname === '/add';
  const storednome = localStorage.getItem('nome');
  const nomeToShow = (isLogin || isConta) ? '' : storednome;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //alert(">"+isLogin + "<>"+isConta+"<");
  //alert(">"+storednome+"<");
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className='navegacao'>
      {((!isLogin) && (!isConta)) ? <a href="/Home"><div className='div-img'>
        <img className='navegacao-img' src="/Capturdfgdfsfar.jpg" alt="ícone projeto" /></div></ a> :
        <img className='navegacao-img' src="/Capturdfgdfsfar.jpg" alt="ícone projeto" />}


      <div className="clock-container">
        <div className="clock">
          <b>{currentTime.toLocaleDateString()} &nbsp;&nbsp; {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}{/*:{currentTime.getMilliseconds()}*/}

          </b>       </div>
      </div>

      

        {((!isLogin) && (!isConta)) && <li><span className="username-container"><h3>Bem-vindo, {maior(nomeToShow)}!</h3></span></li>}<p></p><p></p>
    
    </nav>
  );
}
/* 
<ul type='hidden' style={{ lineHeight: 'normal', verticalAlign: 'middle' }}>
        {children.map((item, index) => (
          <li key={index}  style={{ display: (isLogin) || (isConta) ? 'none' : 'block' }}> 
            <b>

              {(() => {
                if (item === 'Home') {
                } else if (item === 'Funcionarios') {
                  return <button><Link to="/view" style={{ color: cordafonte }}>{item}</Link></button>;
                } else if (item === 'Pedidos') {
                  return <button ><Link to="/viewpedido" style={{ color: cordafonte }}>{item}</Link></button>;
                } else if (item === 'Desktop') {
                  return <button ><Link to="/desktop" style={{ color: cordafonte }}>{item}</Link></button>;
                } else if (item === 'Logout') {
                  return <button onClick={handleLogout}><Link to="/" style={{ color: cordafonte }}>{item}</Link></button>;
                } else {
                  return <button><a style={{ color: cordafonte }} href="#">{item}</a></button>;
                }
              })()}
            </b>
          </li>

        ))}

 if (item === 'Cadastro') {
                return <button><a style={{ color: cordafonte }} href="/funcionario/">{item}</a></button>;
              } else if (item === 'Funcionarios') {
                return <button><a style={{ color: cordafonte }} href="/funcionario/view">{item}</a></button>;
              } else if (item === 'Home') {
                return <button><a style={{ color: cordafonte }} href="/">{item}</a></button>;
              } else if (item === 'Contato') {
                return  <button><a style={{ color: cordafonte }} href="/contato">{item}</a></button>;
              } else if (item === 'Entre') {
                return  <button><a style={{ color: cordafonte }} href="/Login">{item}</a></button>;
              } else {
                return <button><a style={{ color: cordafonte }} href="#">{item}</a></button>;
              }

      <div>
        <h6 type='hidden'className={(!isLogin && !isConta) ? 'with-image' : ''}>
          Apoio: UTD - Universidade do Trabalho Digital
        </h6>
      </div>
<button onClick={teste}>OK</button>

<button onClick={teste}>OK</button>
style={{ display: (isLoggedIn) ? 'none' : 'block' }}
*/
export default NavBar;
