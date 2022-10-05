const socket = io();

import { denormalize } from "./functions.js";

socket.on('connect', () => {
  console.log('Conectado como ' + socket.id);
});

const button = document.getElementById("submitMessage");
button.addEventListener("click", (e) => {
  const message = {
    author: {
      id: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("caja-msg").value,
  };
  socket.emit("new-message", JSON.stringify(message));
  document.getElementById("caja-msg").value = "";
});

socket.on("messages", (data) => {
  let denormalizedChats = denormalize(data);
  let compression =
    (JSON.stringify(denormalizedChats).length / JSON.stringify(data).length) * 100;
  document.getElementById(
    "div-compres"
  ).innerText = `El porcentaje de compresion es %${compression
    .toString()
    .slice(0, 5)}`;

  const add = denormalizedChats.chats
    .map((chat) => {
      let time = new Date(chat.timestamp);
      let formatedTime = time
        .toISOString()
        .replace(/([^T]+)T([^\.]+).*/g, "$1 $2");
      return `
  <p>
  <span style="color: blue;">${chat.author.id}</span>
  <span style="color: brown;">[${formatedTime}]: </span>
  <span style="color: green;">${chat.text}</span>
  <img class='avatar' style="width:3rem" src='${chat.author.avatar}'></img>
  </p>
  `;
    })
    .join(" ");

  document.getElementById("div-chats").innerHTML = add;
});





//CODIGO ANTERIOR
// socket.on('productos', (data) => {
  
//   let htmlToRender = data.reduce((previewHtml, currentHtml) => previewHtml + 
//   `<tr>
//   <td> <h3>${currentHtml.nombre}</h3> </td>
//   <td> <h4>${currentHtml.duracion}</h4> </td>
//   <td> <h4>${currentHtml.frecuencia}</h4> </td>
//   <td> <h4>${currentHtml.precio}</h4> </td>
//   <td> <img src="${currentHtml.thumbnail}"/> </td>
//   </tr>`, '')
  
//   document.querySelector('#listaProductos').innerHTML = htmlToRender;
// });

// socket.on('chat',(data) => {

//   let htmlToRender = data.reduce((previewHtml, currentHtml) => previewHtml + `
//   <tr>
//   <td> <p>${currentHtml.correo}</p> </td>
//   <td> <p>${currentHtml.mensaje}</p> </td>
//   <td> <p>${currentHtml.date}</p> </td>
//   </tr>`, '')

//   document.querySelector('#chats').innerHTML = htmlToRender;
// });

// function enviarMensaje(msg){
//   let agregarMensaje = {
//     correo: msg.correo.value,
//     mensaje: msg.mensaje.value,
//     date: new Date().toLocaleDateString()
//   }
  
//   socket.emit('nuevoMsg', agregarMensaje);

//   return false;
// }

// function agregarProducto(nvoProducto){
//   let datosProducto = {
//     nombre: nvoProducto.nombre.value,
//     precio: nvoProducto.precio.value,
//     duracion: nvoProducto.duracion.value,
//     frecuencia:nvoProducto.frecuencia.value,
//     thumbnail: nvoProducto.thumbnail.value
//   }
  
//   socket.emit('productoNvo', datosProducto);

//   return false;
// }