import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { fDate } from './_shared/util/date.helper';
import { HttpExceptionFilter } from 'adapter/http/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
          // Laissez les directives par défaut de helmet...
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", 'unpkg.com', 'cdn.jsdelivr.net', "'unsafe-inline'"],
          'style-src': ["'self'", 'unpkg.com', 'cdn.jsdelivr.net', "'unsafe-inline'"], // pour les styles
          'img-src': ["'self'", 'data:'], // pour les images (si vous utilisez des data URLs)
        },
      },
      // Désactivez le middleware hsts en développement si vous travaillez en HTTP
      // helmet applique HSTS par défaut, ce qui peut causer des soucis en dev local
      hsts: process.env.NODE_ENV === 'production', // Applique HSTS uniquement en production
  };
  app.use(helmet(helmetOptions));

  app.useGlobalPipes(
    new ValidationPipe({
      // forbidUnknownValues: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('SyGDN API')
    .setDescription(
      `A digital API that enables notaries to centralize, track, and manage their client files \n\n${fDate(new Date())}`,
    )
    .addTag('SyGDN')
    .addBearerAuth()
    .addBasicAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'SyGDN API',
  };
  SwaggerModule.setup('doc', app, document, customOptions);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('APP_PORT') ?? 3002;
  await app.listen(PORT, () => {
    const logger = new Logger('SyGDN::API');
    logger.log(
      `API successfully started on port ${PORT} at ${new Date().toISOString()}`,
    );
  });
}
void bootstrap();
