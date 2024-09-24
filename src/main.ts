import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  console.log(`🚀 ~ Application is running on: ${await app.getUrl()}`);
  console.log(`📝 ~ Documentation of the API available on: ${await app.getUrl()}/api`);
}
bootstrap();
