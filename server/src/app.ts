import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

import planetsRouter from './routes/planets/planets.router.js';
app.use('/planets', planetsRouter);

app.get('/', (_req, res) => {
  res.sendFile(path.join(path.join(__dirname, 'public', 'index.html')));
});

export default app;
