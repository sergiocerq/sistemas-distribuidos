const net = require('net');
const readline = require('readline');

const client = net.createConnection({port: 5000}, () => {
  console.log('Conectado ao chat!');
});

client.on('data', (data) => {
  console.log(data.toString());
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  client.write(input);
});
