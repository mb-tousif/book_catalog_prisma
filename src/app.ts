import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import GlobalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';
import config from './config';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(cookieParser());

app.use('/api/v1', router);
//global error handler
app.use(GlobalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send(
    `<h3 style='text-align: center; padding: 20px; color:green'>🐱‍🏍 Welcome to ${config.app_name} API 🐱‍🏍</h3>`
  );
});

//handle not found
app.all('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

export default app;