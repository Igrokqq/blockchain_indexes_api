import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import AppModule from '@modules/app/app.module';

async function setupSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port: number = configService.get<number>('port', 4000);

  await setupSwagger(app);
  await app.listen(port, () => {
    Logger.log(`[Server] is listening on ${port}`);
  });
}
bootstrap();
