const net = require('net');
const clients = [];

const server = net.createServer(socket => {
  clients.push(socket);
  socket.write('Bem-vindo ao chat!\n');
  
  socket.on('data', data => {
    for (const client of clients) {
      if (client !== socket) {
        client.write(data);
      }
    }
  });
  
  socket.on('end', () => {
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(5000, () => {
  console.log('Servidor TCP ouvindo na porta 5000');
});
