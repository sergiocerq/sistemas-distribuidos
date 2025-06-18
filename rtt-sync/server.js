const express = require('express');
const app = express();
const PORT = 3000;

app.get('/time', (req, res) => {
  const serverTime = Date.now();
  res.json({ serverTime });
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://localhost:${PORT}`);
});
