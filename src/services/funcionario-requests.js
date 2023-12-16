import api from './api';


export async function login(username, senha) {
  const response = await fetch('https://app-55f748f7-178f-4b19-813d-77518c21026d.cleverapps.io/api/funcionario/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, senha }),
  });

  if (response.ok) {
    const funcionarioData = await response.json();
    return { ok: true, funcionario: funcionarioData };
  } else {
    const errorData = await response.json();
    return { ok: false, message: errorData.message };
  }
}



export async function getFuncionario(id) {
  return await api.get(`/funcionario/${id}`).then(response => response);
}
export async function getFuncionario2(username) {
  return await api.get(`/funcionario/${username}`).then(response => response);
}
export async function getFuncionarios() {
  return await api.get("/funcionarios").then(response => response);
}
export async function removeFuncionario(id) {
  return await api.delete(`/funcionario/${id}`).then(response => response);
}
export async function addFuncionario(funcionario) {
  return await api.post("/funcionario", funcionario).then(response => response);
}
export async function editFuncionario(funcionario) {
  return await api.put(`/funcionario`, funcionario).then(response => response);
}



//Mesa
export async function getMesa(id) {
  return await api.get(`/mesa/${id}`).then(response => response);
}

export async function getMesas() {
  return await api.get("/mesas").then(response => response);
}

export async function removeMesa(id) {
  return await api.delete(`/mesa/${id}`).then(response => response);
}

export async function addMesa(mesa) {
  return await api.post("/mesa", mesa).then(response => response);
}

export async function editMesa(mesa) {
  return await api.put(`/mesa`, mesa).then(response => response);
}

//Pedido
export async function getPedido(id) {
  return await api.get(`/pedido/${id}`).then(response => response);
}
export async function getPedidos() {
  return await api.get("/pedidos").then(response => response);
}
export async function getDetalhesPedido() {
  return await api.get("/pedidos").then(response => response);
}
export async function removePedido(id) {
  return await api.delete(`/pedido/${id}`).then(response => response);
}
export async function addPedido(pedido) {
  try {
    const response = await fetch('https://app-55f748f7-178f-4b19-813d-77518c21026d.cleverapps.io/api/pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    if (response.ok) {
      const pedidoData = await response.json();
      return { ok: true, id: pedidoData.id };
    } else {
      const errorData = await response.json();
      return { ok: false, message: errorData.message };
    }

  } catch (error) {
    console.error("Erro na addPedido:", error);
    throw error;
  }
}

export async function editPedido(pedido) {
  return await api.put(`/pedido`, pedido).then(response => response);
}

//Itens Pedidos

export async function getItemPedido(id) {
  return await api.get(`/itempedido/${id}`).then(response => response);
}

export async function getItemPedidos() {
  return await api.get("/itempedidos").then(response => response);
}
export async function getItensEmAndamento() {
  return await api.get("/itensemand").then(response => response);
}
export async function getItensEntregue() {
  return await api.get("/itensentregue").then(response => response);
}
export async function removeItemPedido(id) {
  return await api.delete(`/itempedido/${id}`).then(response => response);
}
export async function addItemPedido(itemPedido) {
  return await api.post("/itempedido", itemPedido).then(response => response);
}
export async function editItemPedido(itemPedido) {
  return await api.put(`/itempedido`, itemPedido).then(response => response);
}
export async function updateItemPedido(id, tempo) {
  return await api.put(`/itempedido/${id}/${tempo}`).then(response => response);
}
export async function atualizarStatusConcluido(id) {
  return await api.put(`/itempedidoconcluido/${id}`).then(response => response);
}
export async function atualizarStatusPago(id) {
  return await api.put(`/itempedidopago/${id}`).then(response => response);
}
export async function atualizarStatusCancelar(id) {
  return await api.put(`/itempedidocancelar/${id}`).then(response => response);
}
export async function atualizarStatusPagoGarcom(id) {
  return await api.put(`/itempedidopagogarcom/${id}`).then(response => response);
}
export async function getItensPorMesa(mesaId, funcionarioId) {
  return await api.get(`/itens-por-mesa/${mesaId}/${funcionarioId}`).then(response => response);
}
export async function getItensPorMesaDetalhado(mesaId,funcionarioId) {
  return await api.get(`/itens-por-mesa-detalhado/${mesaId}/${funcionarioId}`).then(response => response);
}


export async function getItensPorGarcom(funcionarioId) {
  return await api.get(`/itens-por-garcom/${funcionarioId}`).then(response => response);
}


//Cardapio
 export async function getProduto(id) {
  return await api.get(`/produto/${id}`).then(response => response);
}
export async function getProdutos() {
  return await api.get("/produtos").then(response => response);
}
export async function removeProduto(id) {
  return await api.delete(`/produto/${id}`).then(response => response);
}
export async function addProduto(produto) {
  return await api.post("/produto", produto).then(response => response);
}
export async function editProduto(produto) {
  return await api.put(`/produto`, produto).then(response => response);
}


// Estoque
export async function getEstoque(id) {
  return await api.get(`/estoque/${id}`).then(response => response);
}

export async function getEstoques() {
  return await api.get("/estoques").then(response => response);
}

export async function removeEstoque(id) {
  return await api.delete(`/estoque/${id}`).then(response => response);
}

export async function addEstoque(estoque) {
  return await api.post("/estoque", estoque).then(response => response);
}

export async function editEstoque(estoque) {
  return await api.put(`/estoque`, estoque).then(response => response);
}




// PedidoGarcom
export async function getPedidoGarcom(id) {
  return await api.get(`/pedidogarcom/${id}`).then(response => response);
}

export async function getPedidosGarcons() {
  return await api.get("/pedidosgarcons").then(response => response);
}

export async function removePedidoGarcom(id) {
  return await api.delete(`/pedidogarcom/${id}`).then(response => response);
}

export async function addPedidoGarcom(pedidoGarcom) {
  return await api.post("/pedidogarcom", pedidoGarcom).then(response => response);
}

export async function editPedidoGarcom(pedidoGarcom) {
  return await api.put(`/pedidogarcom`, pedidoGarcom).then(response => response);
}



// CategoriaProduto
export async function getCategoriaProduto(id) {
  return await api.get(`/categoriaproduto/${id}`).then(response => response);
}

export async function getCategoriasProdutos() {
  return await api.get("/categoriasprodutos").then(response => response);
}

export async function removeCategoriaProduto(id) {
  return await api.delete(`/categoriaproduto/${id}`).then(response => response);
}

export async function addCategoriaProduto(categoria) {
  return await api.post("/categoriaproduto", categoria).then(response => response);
}

export async function editCategoriaProduto(categoria) {
  return await api.put(`/categoriaproduto`, categoria).then(response => response);
}





// No seu serviço cliente-requests (services/cliente-requests.js)
/*export async function login(username, password) {
  return await api.post("/cliente/login", { username, password });
}

  return await api.post("/cliente/login",{username, password}).then(response=>response);
  export const login = (method, url, data) =>{
   
      return api.({
          method: method,
          headers:headers,
          url:url,
          data: data
      })
   }*/
