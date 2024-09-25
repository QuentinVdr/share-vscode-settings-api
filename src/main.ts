import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));
  Logger.log(`🚀 ~ ENV : ${configService.get('NODE_ENV')}`);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'X-API-Key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  const url = await app.getUrl();
  Logger.log(`🚀 ~ Application is running on: ${url}`);
  Logger.log(`📝 ~ Documentation of the API available on: ${url}/api`);
}
bootstrap();
