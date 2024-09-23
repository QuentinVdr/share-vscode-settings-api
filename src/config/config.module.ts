import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigController } from './config.controller';
import { ConfigDocument, ConfigDocumentSchema } from './config.model';
import { ConfigService } from './config.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ConfigDocument.name, schema: ConfigDocumentSchema }])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule implements OnModuleInit {
  constructor(private readonly logger: Logger) {}

  async onModuleInit() {
    try {
      await mongoose.connect(process.env.DB);
      this.logger.log('Connected to MongoDB Atlas');
    } catch (error) {
      this.logger.error('Failed to connect to MongoDB Atlas', error);
    }
  }
}
