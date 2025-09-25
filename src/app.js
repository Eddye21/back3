import express from 'express';
import cookieParser from 'cookie-parser';
import dbConnect from './utils/dbConnect.utils.js'
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import usersDocs from './docs/users.swagger.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT||8080 
const connection = dbConnect(process.env.MONGODB_URI)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(usersDocs));

app.listen(PORT, connection, () => {
    console.log(`Server online on port http://localhost:${PORT}`)
})
