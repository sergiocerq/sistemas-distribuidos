const axios = require('axios');

async function syncClock() {
  const serverUrl = 'http://localhost:3000/time';
  
  const clientSendTime = Date.now();
  const response = await axios.get(serverUrl);
  const clientReceiveTime = Date.now();
  
  const rtt = clientReceiveTime - clientSendTime;
  const serverTime = response.data.serverTime;
  
  const estimatedClientTimeAtRequest = clientSendTime + rtt / 2;
  const offset = serverTime - estimatedClientTimeAtRequest;
  
  const adjustedClientTime = Date.now() + offset;
  
  console.log('\n\n--------------------------------------------------');
  console.log(`RTT: ${rtt} ms`);
  console.log(`Hora do servidor: ${new Date(serverTime).toISOString()}`);
  console.log(`Hora ajustada do cliente: ${new Date(adjustedClientTime).toISOString()}`);
  console.log('--------------------------------------------------\n\n');
}

syncClock().catch(console.error);
