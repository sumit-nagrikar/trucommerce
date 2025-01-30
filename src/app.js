import express from 'express';
import userRoutes from './routes/v1/user.routes';
import cors from 'cors';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Trucommerce Backend');
});

// User routes

app.use('/api/v1/users', userRoutes);

export default app;
