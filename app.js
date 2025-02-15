import express from 'express';

import { PORT, NODE_ENV } from './config/env.js';
import { userRouter } from './routes/user.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { subscriptionRouter } from './routes/subscription.routes.js';
import { connectToDatabase } from './db/mongodb.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Helllooo');
});

app.listen(PORT, async () => {
  console.log(`running on ${PORT}`);

  await connectToDatabase();

  console.log('Connected to DB in', NODE_ENV, 'mode');
});

export { app };
