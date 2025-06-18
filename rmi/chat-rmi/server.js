const express = require('express');
const app = express();
app.use(express.json());

let messages = [];

app.post('/sendMessage', (req, res) => {
  const { user, message } = req.body;
  messages.push({ user, message });
  res.send({ status: 'OK' });
});

app.get('/getMessages', (req, res) => {
  res.send(messages);
});

app.listen(4000, () => {
  console.log('Servidor RMI ouvindo em http://localhost:4000');
});
