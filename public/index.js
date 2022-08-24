const socket = io();

socket.on('connect', () => {
  console.log('Conectado como ' + socket.id);
})