import express from 'express';
import cors from 'cors';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Trucommerce Backend');
});

export default app;
