function NoMatch() {
  return (
    <div className='login-container' style={{ textAlign: 'center', fontSize: '1.5em', marginTop: '20vh' }}>
      <div className="actions3">
        <img src="/!.JPG" alt="Imagem de boas-vindas" />
      </div>
      <h1>PÁGINA NÃO ENCONTRADA!</h1>
      <p>
        <strong>Desculpe-nos, mas a página requisitada não pode ser encontrada.</strong>
      </p>
      <p>
        Por favor, entre em contato com o administrador.
      </p>
    </div>
  );
}

export default NoMatch;
