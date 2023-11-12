import dotenv from 'dotenv';
import express from 'express';
import apiRouter from './routes/apiRouter';
import { API_BASE } from './routes/paths';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_BASE, apiRouter);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ error: 'Unauthorized' });
  }
});

export default app;
