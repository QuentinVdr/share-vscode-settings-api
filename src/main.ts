import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './guards/api-key.guard';
import { getNodeEnv } from './utils/environmentUtils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));
  Logger.log(`🔧 ~ NODE ENV : ${getNodeEnv(configService)}`);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'X-API-Key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  const url = await app.getUrl();
  Logger.log(`🚀 ~ Application is running on: ${url}`);
  Logger.log(`📝 ~ Documentation of the API available on: ${url}/api`);
}
bootstrap();
