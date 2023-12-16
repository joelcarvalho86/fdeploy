// pages/Contato/index.js

import React, { useState } from 'react';
import './Contato.css'; 
import { useNavigate } from 'react-router-dom';

function Contato() {
  const navigate = useNavigate();
  const [contato, setContato] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContato((contatoAnterior) => ({
      ...contatoAnterior,
      [name]: value,
    }));
  };

  const enviarMensagem = (event) => {
    event.preventDefault();
    console.log('Mensagem enviada:', contato);
    navigate('/home');
  };

  return (
    <div className="form-container">
      <h1>Entre em Contato</h1>
      <form onSubmit={enviarMensagem}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={contato.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contato.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="mensagem">Mensagem:</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows="4"
          value={contato.mensagem}
          onChange={handleChange}
          required
        ></textarea>

       
        
             <button type="submit">Enviar Mensagem</button>
       </form>
    </div>
  );
}
//<div className="button-container"> 
export default Contato;
