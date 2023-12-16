import React from 'react';
import { Link } from 'react-router-dom';
import './Desktop.css';

function Desktop() {
  function maior(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const isLogin = window.location.pathname === '/';
  const isConta = window.location.pathname === '/add';
  const storednome = localStorage.getItem('nome');
  const storedidfuncao = localStorage.getItem('idfuncao');
  const nomeToShow = (isLogin || isConta) ? '' : storednome;

  return (
    <div className="garcom-desktop-container">
      <h1 className={`a1 ${storedidfuncao === '2' ? 'small-buttons' : ''}`}>
        {storedidfuncao === '4' ? 'Área do Garçom' : ''}
        {storedidfuncao === '3' ? 'Área da Cozinheira' : ''}
        {storedidfuncao === '2' ? 'Área do Gerente' : ''}
      </h1>

      {(!isLogin && !isConta) && (
        <li>
          <span className="username-container">
            <h3>Bem-vindo, {maior(nomeToShow)}!</h3>
          </span>
        </li>
      )}

      <p></p>
      <p></p>
      <div className={`garcom-buttons-container ${storedidfuncao === '2' ? 'small-buttons' : ''}`}>
        {storedidfuncao === '4' && (
          <>
            <Link to="/addpedido">
              <button className="garcom-button">Novo Pedido</button>
            </Link>
            <Link to="/contacliente">
              <button className="garcom-button">Conta Cliente</button>
            </Link>
            <Link to="/viewpedidos">
              <button className="garcom-button">Ver Pedidos</button>
            </Link>
            <Link to="/viewcardapio">
              <button className="garcom-button">Cardápio</button>
            </Link>
            <Link to="/">
              <button className="garcom-button">Logoff</button>
            </Link>

          </>
        )}

        {storedidfuncao === '2' && (
          <>
            <Link to="/viewpedidos">
              <button className="garcom-small-button">Ver Pedidos</button>
            </Link>

            <Link to="/view">
              <button className="garcom-small-button">Ver Funcionários</button>
            </Link>

            <Link to="/viewmesa">
              <button className="garcom-small-button">Ver Mesas</button>
            </Link>
            <Link to="/viewcategoria">
              <button className="garcom-small-button">Ver Categoria Produtos</button>
            </Link>
            <Link to="/viewestoque">
              <button className="garcom-small-button">Ver Estoques</button>
            </Link>
            <Link to="/viewpedidogarcom">
              <button className="garcom-small-button">Ver Pedido Garçons</button>
            </Link>
            <Link to="/add">
              <button className="garcom-small-button">Cadastro Funcionário</button>
            </Link>
            <Link to="/addestoque">
              <button className="garcom-small-button">Cadastro Estoque</button>
            </Link>
            <Link to="/addcardapio">
              <button className="garcom-small-button">Cadastrar Produto</button>
            </Link>
            <Link to="/addcategoria">
              <button className="garcom-small-button">Cadastrar Categorias</button>
            </Link>
            <Link to="#">
              <button className="garcom-small-button">Conta Cliente</button>
            </Link>

            <Link to="#">
              <button className="garcom-small-button">Conta Garçom</button>
            </Link>
            <Link to="/viewcardapio">
              <button className="garcom-small-button">Cardápio</button>
            </Link>
            <Link to="/">
              <button className="garcom-small-button">Logoff</button>
            </Link>
          </>
        )}

        {storedidfuncao === '3' && (
          <>
            <Link to="/viewpedidos">
              <button className="garcom-button">Ver Pedidos</button>
            </Link>
            <Link to="/viewestoque">
              <button className="garcom-button">Ver Estoques</button>
            </Link>
            <Link to="/viewcardapio">
              <button className="garcom-button">Cardápio</button>
            </Link>
            <Link to="/">
              <button className="garcom-button">Logoff</button>
            </Link>

          </>
        )}
      </div>
    </div>
  );
}

export default Desktop;
