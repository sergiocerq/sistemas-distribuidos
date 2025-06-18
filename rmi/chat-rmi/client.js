const axios = require('axios');
const readline = require('readline');

const user = process.argv[2] || 'usuário';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMensagens() {
  axios.get('http://localhost:4000/getMessages').then(res => {
    console.clear();
    res.data.forEach(msg => {
      console.log(`[${msg.user}]: ${msg.message}`);
    });
  });
}

function loop() {
  rl.question('Digite sua mensagem: ', async (msg) => {
    await axios.post('http://localhost:4000/sendMessage', {
      user,
      message: msg
    });
    mostrarMensagens();
    loop();
  });
}

mostrarMensagens();
loop();
