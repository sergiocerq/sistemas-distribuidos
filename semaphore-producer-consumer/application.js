class Semaphore {
  constructor(count) {
    this.count = count;
    this.queue = [];
  }
  
  async wait() {
    if (this.count > 0) {
      this.count--;
    } else {
      await new Promise(resolve => this.queue.push(resolve));
    }
  }
  
  signal() {
    this.count++;
    if (this.queue.length > 0) {
      this.count--;
      const next = this.queue.shift();
      next();
    }
  }
}

const bufferSize = 5;
const buffer = [];

const empty = new Semaphore(bufferSize); // controla espaços vazios
const full = new Semaphore(0);           // controla itens disponíveis
const mutex = new Semaphore(1);          // exclusão mútua

let itemId = 0;

async function produtor(id) {
  while (true) {
    await empty.wait();  // espera espaço no buffer
    await mutex.wait();  // exclusão mútua
    
    const item = `item-${itemId++}`;
    buffer.push(item);
    console.log(`🟢 Produtor ${id} produziu ${item} | Buffer: [${buffer.join(', ')}]`);
    
    mutex.signal();
    full.signal();       // sinaliza que tem item disponível
    
    await sleep(randomDelay());
  }
}

async function consumidor(id) {
  while (true) {
    await full.wait();   // espera item no buffer
    await mutex.wait();  // exclusão mútua
    
    const item = buffer.shift();
    console.log(`🔴 Consumidor ${id} consumiu ${item} | Buffer: [${buffer.join(', ')}]`);
    
    mutex.signal();
    empty.signal();      // sinaliza que tem espaço vazio
    
    await sleep(randomDelay());
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay() {
  return Math.floor(Math.random() * 1000) + 500;
}

// Inicializa 2 produtores e 2 consumidores
produtor(1);
produtor(2);
consumidor(1);
consumidor(2);
