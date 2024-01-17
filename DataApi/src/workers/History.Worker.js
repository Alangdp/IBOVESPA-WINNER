import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MacroInfo } from '../global/MacroInfo.js';
import instanceStock from '../Entities/instance.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filename = basename(__filename);

const workers = [];
const tickers = ['BBAS3', 'TAEE11', 'KLBN3'];
const stocksInfo = [];

// Função para criar instâncias dos workers
function createWorkerInstance(ticker) {
  const worker = new Worker(__filename, { workerData: ticker });

  worker.on('message', (data) => {
    console.log(`${data} Stock from worker: ${ticker}`);
    MacroInfo.stocks.push(data);
    console.log(MacroInfo.stocks);
  });

  return worker;
}

// Função para criar e executar instâncias dos workers para os tickers fornecidos
function makeInstances(tickers) {
  const workers = [];

  for (let i = 0; i < tickers.length; i++) {
    const worker = createWorkerInstance(tickers[i]);
    workers.push(worker);
  }

  return workers;
}

// Função para terminar os workers e lidar com mensagens
function handleWorkerMessages(worker) {
  worker.on('message', (data) => {
    console.log(`${data} Stock from worker: ${data}`);
    worker.terminate();
  });
}

// Função principal
async function main(tickers) {
  if (isMainThread) {
    const workers = makeInstances(tickers);

    for (const worker of workers) {
      handleWorkerMessages(worker);
    }
  } else {
    const stock = await instanceStock(workerData);
    parentPort.postMessage(stock);
  }
}

export default main;
