import express from 'express';
import cors from 'cors';

import { handleCumtd } from './cumtd.js';

const app = express();
const port = 3001;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cumtd/:endpoint', cors(corsOptions), (req, res) => {
  const endpoint = req.params.endpoint;
  const query = req.query;
  console.log(`CUMTD request: ${endpoint} ${JSON.stringify(query)}`);
  handleCumtd(endpoint, query, res);
});

function start() {
  // check for API key
  if (!process.env.CUMTD_API_KEY) {
    console.error('CUMTD_API_KEY must be set');
    process.exit(1);
  }

  // start the server
  app.listen(port, () => {
    console.log(`Tiny timely transit backend server listening on port ${port}`);
  });
}

start();
