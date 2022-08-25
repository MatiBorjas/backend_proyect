const socket = io();

socket.on('connect', () => {
  console.log('Conectado como ' + socket.id);
});


socket.on('productos', (data) => {
  
  let htmlToRender = data.reduce((previewHtml, currentHtml) => previewHtml + `
  <tr>
  <td> <h3>${currentHtml.nombre}</h3> </td>
  <td> <h4>${currentHtml.precio}</h4> </td>
  <td> <img src="${currentHtml.thumbnail}"/> </td>
  </tr>`, '')
  
  document.querySelector('#listaProductos').innerHTML = htmlToRender;
});

socket.on('chat',(data) => {

  let htmlToRender = data.reduce((previewHtml, currentHtml) => previewHtml + `
  <tr>
  <td> <p>${currentHtml.correo}</p> </td>
  <td> <p>${currentHtml.mensaje}</p> </td>
  <td> <p>${currentHtml.date}</p> </td>
  </tr>`, '')

  document.querySelector('#chats').innerHTML = htmlToRender;
});

function enviarMensaje(msg){
  let agregarMensaje = {
    correo: msg.correo.value,
    mensaje: msg.mensaje.value,
    date: new Date().toLocaleDateString()
  }
  
  socket.emit('nuevoMsg', agregarMensaje);

  return false;
}

function agregarProducto(nvoProducto){
  let datosProducto = {
    nombre: nvoProducto.nombre.value,
    precio: nvoProducto.precio.value,
    thumbnail: nvoProducto.thumbnail.value
  }
  
  socket.emit('productoNvo', datosProducto);

  return false;
}