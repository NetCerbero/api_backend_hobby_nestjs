import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/exception/globalExceptionFilter';
import { TransformInterceptorResponse } from './core/transform/transformInterceptorResponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = {
    origin: (origin, callback) => {
      console.log("origen",origin)
      if (
        !origin ||
        AppModule.allowedOrigins.some((o) => origin.startsWith(o))
      ) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por el CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    //allowedHeaders:'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization',
  };
  app.enableCors(options);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptorResponse());
  await app.listen(AppModule.port);
}
bootstrap();
