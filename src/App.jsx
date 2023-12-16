import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Contato from './pages/Contato';
import Termos from './pages/Termos';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import Sobre from './pages/Sobre';

import Login from './pages/Login';
import Desktop from './pages/Desktop';

// Adicionando imports para as páginas de adição e edição
import AddFuncionario from './pages/AddFuncionario';
import AddMesa from './pages/AddMesa';
import AddCardapio from './pages/AddCardapio';
import AddPedido from './pages/AddPedido';
import AddEstoque from './pages/AddEstoque';
import AddPedidoGarcom from './pages/AddPedidoGarcom';
import AddCategoria from './pages/AddCategoria';

import ViewFuncionario from './pages/ViewFuncionario';
import ViewCardapio from './pages/ViewCardapio';
import ViewMesa from './pages/ViewMesa';
import ViewPedidos from './pages/ViewPedidos';
import ViewEstoque from './pages/ViewEstoque';
import ViewPedidoGarcom from './pages/ViewPedidoGarcom';
import ViewCategoria from './pages/ViewCategoria';

import EditFuncionario from './pages/EditFuncionario';
import EditMesa from './pages/EditMesa';
import EditCardapio from './pages/EditCardapio';
import EditEstoque from './pages/EditEstoque';
//import EditPedido from './pages/EditPedido';
import EditPedidoGarcom from './pages/EditPedidoGarcom';
import EditCategoria from './pages/EditCategoria'; 

import ContaCliente from './pages/ContaCliente'; 
import ContaGarcom from './pages/ContaGarcom'; 




function App() {
  const lista = ['início', 'produtos', 'fale conosco'];

  const mostrarLista = () => {
    console.log(lista);
  };
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');

  return (
    <>
      <div>
        <NavBar isLoggedIn={isLoggedIn} username={username} cordafonte="white">
          {['Home', 'Desktop', 'Funcionarios', 'Pedidos', 'Logout']}
        </NavBar>

        <Routes>
          <Route index element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="home" element={<Home />} />
          <Route path="termos" element={<Termos />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="priv" element={<PoliticaPrivacidade />} />
          <Route path="contato" element={<Contato />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="addpedido" element={<AddPedido />} />

          <Route path="desktop" element={<Desktop />} />
          <Route path="add" element={<AddFuncionario />} />
          <Route path="addmesa" element={<AddMesa />} />
          <Route path="addcardapio" element={<AddCardapio />} />
          <Route path="addestoque" element={<AddEstoque />} />
          <Route path="addpedidogarcom" element={<AddPedidoGarcom />} />
          <Route path="addcategoria" element={<AddCategoria />} />

          <Route path="view" element={<ViewFuncionario />} />
          <Route path="viewmesa" element={<ViewMesa />} />
          <Route path="viewcardapio" element={<ViewCardapio />} />
          <Route path="viewestoque" element={<ViewEstoque />} />
          <Route path="viewcategoria" element={<ViewCategoria />} />
          <Route path="viewpedidogarcom" element={<ViewPedidoGarcom />} />
          <Route path="viewpedidos" element={<ViewPedidos />} />



          <Route path="/edit/:id" element={<EditFuncionario />} />
          <Route path="editmesa/:id" element={<EditMesa />} />
          <Route path="editcarpadio/:id" element={<EditCardapio />} />
          <Route path="editestoque/:id" element={<EditEstoque />} />
          <Route path="editcategoria/:id" element={<EditCategoria />} />
          <Route path="editpedidogarcom/:id" element={<EditPedidoGarcom />} />


          <Route path="contacliente" element={<ContaCliente />} />
          <Route path="contagarcom" element={<ContaGarcom />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
/*

       
          <Route path="editpedido/:id" element={<EditPedido />} />





*/