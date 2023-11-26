import dotenv from 'dotenv';
import express from 'express';
import apiRouter from './routes/apiRouter';
import  Paths  from './routes/paths';
const connectToMongoDB = require('./services/mongooseService');

dotenv.config();

// Connect to MongoDB
connectToMongoDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Paths.Base, apiRouter);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ error: 'Unauthorized' });
  }
});

export default app;
