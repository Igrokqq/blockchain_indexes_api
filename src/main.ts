import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import AppModule from '@modules/app/app.module';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';
import AllExceptionsFilter from '@common/exception.filter';
import { TransformResponseInterceptor } from '@common/interceptors/response.interceptor';

async function setupSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

function initSentry(app: INestApplication, dsn: string): void {
  Sentry.init({
    dsn,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new SentryTracing.Integrations.Express({ app: app as any }),
    ],
    tracesSampleRate: 1.0,
  });
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port: number = configService.get<number>('PORT', 4000);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await initSentry(app, configService.get<string>('SENTRY_DSN', ''));
  await setupSwagger(app);
  await app.listen(port, () => {
    Logger.log(`[Server] is listening on ${port}`);
  });
}
bootstrap();
