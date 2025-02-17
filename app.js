import express from 'express';

import { PORT, NODE_ENV } from './config/env.js';
import { userRouter } from './routes/user.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { subscriptionRouter } from './routes/subscription.routes.js';
import { connectToDatabase } from './db/mongodb.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import { arcjetMiddleware } from './middlewares/arcjet.middleware.js';
import { workflowRouter } from './routes/workflow.routes.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflow', workflowRouter);

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
